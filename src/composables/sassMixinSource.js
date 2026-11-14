// Keep offsets while masking strings/comments, so braces in examples and error messages
// cannot accidentally truncate a real Sass declaration.
function maskSass(source) {
  let output = '',
    quote = '',
    comment = '';
  for (let i = 0; i < source.length; i++) {
    const char = source[i],
      next = source[i + 1];
    if (comment === 'line') {
      if (char === '\n') {
        comment = '';
        output += '\n';
      } else output += ' ';
    } else if (comment === 'block') {
      if (char === '*' && next === '/') {
        output += '  ';
        i++;
        comment = '';
      } else output += char === '\n' ? '\n' : ' ';
    } else if (quote) {
      if (char === '\\') {
        output += '  ';
        i++;
      } else {
        if (char === quote) quote = '';
        output += char === '\n' ? '\n' : ' ';
      }
    } else if (char === '/' && next === '/') {
      output += '  ';
      i++;
      comment = 'line';
    } else if (char === '/' && next === '*') {
      output += '  ';
      i++;
      comment = 'block';
    } else if (char === '"' || char === "'") {
      quote = char;
      output += ' ';
    } else output += char;
  }
  return output;
}
const normalize = (name) => name.replace(/_/g, '-');
function commentStart(source, index) {
  let start = index;
  while (start > 0) {
    const end = start - 1;
    const previous = source.lastIndexOf('\n', end - 1) + 1;
    if (!source.slice(previous, end).trim().startsWith('//')) break;
    start = previous;
  }
  return start;
}
export function getSassMixinSource(source, selectedName, usage = '') {
  const masked = maskSass(source);
  const definitions = new Map();
  for (const match of masked.matchAll(/^@(mixin|function)\s+([\w-]+)/gm)) {
    const opening = masked.indexOf('{', match.index);
    let depth = 1,
      end = opening + 1;
    while (end < masked.length && depth) {
      if (masked[end] === '{') depth++;
      else if (masked[end] === '}') depth--;
      end++;
    }
    if (depth) throw new Error(`Unclosed Sass definition: ${match[2]}`);
    definitions.set(`${match[1]}:${normalize(match[2])}`, {
      kind: match[1],
      name: match[2],
      code: source.slice(commentStart(source, match.index), end),
      body: masked.slice(match.index, end)
    });
  }
  const variables = new Map();
  for (const match of masked.matchAll(/^\$([\w-]+)\s*:/gm)) {
    const end = masked.indexOf(';', match.index) + 1;
    variables.set(normalize(match[1]), {
      name: match[1],
      code: source.slice(commentStart(source, match.index), end)
    });
  }
  const selectedKey = 'mixin:' + normalize(selectedName);
  if (!definitions.has(selectedKey)) throw new Error(`Unknown mixin: ${selectedName}`);
  const visited = new Set(),
    ordered = [];
  function visit(key) {
    if (visited.has(key) || !definitions.has(key)) return;
    visited.add(key);
    const definition = definitions.get(key);
    for (const include of definition.body.matchAll(/@include\s+([\w-]+)\b/g))
      visit('mixin:' + normalize(include[1]));
    for (const call of definition.body.matchAll(/([\w-]+)\s*\(/g))
      visit('function:' + normalize(call[1]));
    ordered.push(definition);
  }
  visit(selectedKey);
  // Include other mixins used by the example as well (e.g. button-reset + focus-ring).
  for (const include of maskSass(usage).matchAll(/@include\s+(?:[\w-]+\.)?([\w-]+)\b/g))
    visit('mixin:' + normalize(include[1]));
  const neededVariables = new Map();
  function collectVariables(body) {
    for (const match of body.matchAll(/\$([\w-]+)/g)) {
      const name = normalize(match[1]);
      if (variables.has(name) && !neededVariables.has(name)) {
        neededVariables.set(name, variables.get(name));
        collectVariables(maskSass(variables.get(name).code));
      }
    }
  }
  ordered.forEach((definition) => collectVariables(definition.body));
  const combined = ordered.map((definition) => definition.body).join('\n');
  const imports = [...source.matchAll(/^@use\s+(['"])([^'"]+)\1(?:\s+as\s+([\w-]+))?[^;]*;/gm)]
    .filter((match) => {
      const namespace = match[3] || match[2].split(':').pop().split('/').pop();
      return new RegExp('\\b' + namespace + '\\.').test(combined);
    })
    .map((match) => match[0]);
  const primary = definitions.get(selectedKey);
  const dependencies = ordered.filter((definition) => definition !== primary);
  const setup = [...imports, ...[...neededVariables.values()].map((variable) => variable.code)];
  return {
    primary: primary.code,
    dependencyNames: [
      ...imports,
      ...[...neededVariables.values()].map((variable) => '$' + variable.name),
      ...dependencies.map((definition) => '@' + definition.kind + ' ' + definition.name)
    ],
    dependencyCode: [...setup, ...dependencies.map((definition) => definition.code)].join('\n\n'),
    bundle: [...setup, ...ordered.map((definition) => definition.code)].join('\n\n')
  };
}
