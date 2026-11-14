import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
for (const [name, definition] of Object.entries({
  xml,
  javascript,
  typescript,
  css,
  scss,
  json,
  bash
}))
  hljs.registerLanguage(name, definition);
const aliases = {
  html: 'xml',
  markup: 'xml',
  template: 'xml',
  js: 'javascript',
  ts: 'typescript',
  style: 'scss',
  sh: 'bash',
  shell: 'bash'
};
const escape = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
function highlight(text, language) {
  return hljs.getLanguage(language)
    ? hljs.highlight(text, { language, ignoreIllegals: true }).value
    : escape(text);
}
// highlight.js escapes input HTML. Only its generated token spans are rendered as HTML;
// unsupported languages stay escaped text. No source code is executed.
export function highlightCode(source, requested = 'plaintext') {
  const text = String(source ?? '');
  const key = String(requested).toLowerCase().replace(/^.*\./, '');
  const language = aliases[key] || key;
  if (language !== 'vue') return highlight(text, language);
  let output = '',
    cursor = 0;
  // Explicitly highlight SFC script/style bodies with their own grammar.
  const blocks = /<(script|style)\b([^>]*)>([\s\S]*?)<\/\1\s*>/gi;
  for (const match of text.matchAll(blocks)) {
    const opening = match[0].slice(0, match[0].indexOf('>') + 1);
    const closing = match[0].slice(opening.length + match[3].length);
    output += highlight(text.slice(cursor, match.index) + opening, 'xml');
    const lang = /\blang\s*=\s*["']([^"']+)["']/i.exec(match[2])?.[1];
    output += highlight(
      match[3],
      aliases[lang] || lang || (match[1].toLowerCase() === 'script' ? 'javascript' : 'css')
    );
    output += highlight(closing, 'xml');
    cursor = match.index + match[0].length;
  }
  return output + highlight(text.slice(cursor), 'xml');
}
