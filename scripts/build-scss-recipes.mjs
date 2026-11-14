import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { compile } from 'sass';
import prettier from 'prettier';
const root = fileURLToPath(new URL('..', import.meta.url));
const file = resolve(root, 'src/data/scssRecipes.json');
const recipes = JSON.parse(readFileSync(file, 'utf8'));
export const sassOptions = {
  importers: [
    {
      findFileUrl(url) {
        return url.startsWith('@/') ? pathToFileURL(resolve(root, 'src', url.slice(2))) : null;
      }
    }
  ]
};
for (const recipe of recipes) {
  recipe.html = (await prettier.format(recipe.html, { parser: 'html', printWidth: 90 })).trim();
  recipe.css = compile(resolve(root, recipe.file.slice(1)), sassOptions).css;
}
writeFileSync(file, JSON.stringify(recipes, null, 2) + '\n');
console.log(`Compiled ${recipes.length} SCSS recipes from real files.`);
