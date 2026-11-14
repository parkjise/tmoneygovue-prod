// CSS3 patterns reuse already compiled CSS, never Sass compilation in the browser.
export function resolveCssPatterns(configs, recipes) {
  return configs.map((config) => {
    const recipe = config.recipeId ? recipes.find((item) => item.id === config.recipeId) : null;
    if (config.recipeId && !recipe) throw new Error('Missing CSS recipe: ' + config.recipeId);
    return { ...config, css: config.css ?? recipe?.css, html: config.html ?? recipe?.html };
  });
}
export function resolveCssTips(configs, patterns) {
  return configs.map((config) => {
    const pattern = config.patternId ? patterns.find((item) => item.id === config.patternId) : null;
    if (config.patternId && !pattern)
      throw new Error('Missing CSS tip pattern: ' + config.patternId);
    return { ...config, css: config.css ?? pattern?.css, html: config.html ?? pattern?.html };
  });
}
export const cssExampleBase = `* { box-sizing: border-box; }
body { margin: 0; padding: 24px; font: 14px/1.8 system-ui, sans-serif; color: var(--text); background: var(--surface); }
h1, h2, h3, p { margin: 0; }
a { color: var(--primary); text-underline-offset: 3px; }
button, input, select, textarea { font: inherit; color: inherit; }
button, input, select, textarea { padding: 8px 12px; border: 1px solid var(--border); border-radius: 6px; background: var(--surface); }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; }
button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, a:focus-visible { outline: 3px solid var(--primary); outline-offset: 3px; }
label { display: grid; gap: 7px; }
input[type=checkbox], input[type=radio] { accent-color: var(--primary); }
.recipe-demo { min-width: 0; }
`;
export function buildCssStyles(pattern, themeVariables = '') {
  return themeVariables.trim() + '\n\n' + cssExampleBase.trim() + '\n\n' + pattern.css.trim();
}
export function buildCssDocument(pattern, themeVariables = '', dark = false) {
  const title = pattern.title.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );
  const styles = buildCssStyles(pattern, themeVariables).replace(/<\/style/gi, '<\\/style');
  return `<!doctype html>\n<html lang="ko" data-theme="${dark ? 'dark' : 'light'}">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${title}</title>\n  <style>\n${styles}\n  </style>\n</head>\n<body>\n${pattern.html}\n</body>\n</html>\n`;
}
