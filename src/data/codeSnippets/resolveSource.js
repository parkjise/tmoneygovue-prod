/** Resolve both JS imports and Sass partial/module entry points against the source inventory. */
export function resolveSourcePath(from, target, hasSource, sass = false) {
  target = target.split('?')[0];
  if (target.startsWith('sass:')) return null;
  if (target.startsWith('@/')) target = '/src/' + target.slice(2);
  else if (target.startsWith('.') || sass) {
    const parts = from.split('/').slice(0, -1);
    target.split('/').forEach((part) => {
      if (part === '..') parts.pop();
      else if (part !== '.') parts.push(part);
    });
    target = parts.join('/');
  } else return null;
  const slash = target.lastIndexOf('/');
  const partial = target.slice(0, slash + 1) + '_' + target.slice(slash + 1);
  const candidates = sass
    ? [target, target + '.scss', partial, partial + '.scss', target + '/_index.scss']
    : [target, target + '.js', target + '.vue', target + '.scss'];
  return candidates.find(hasSource) ?? null;
}
