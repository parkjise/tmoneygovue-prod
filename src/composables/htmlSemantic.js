export const semanticPreviewCss = `
body {
  line-height: 1.8;
}
:where(
  header,
  main,
  section,
  article,
  aside,
  footer,
  nav,
  form,
  figure,
  blockquote,
  fieldset,
  details
) {
  margin: 12px 0;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: 10px;
}
h1,
h2,
h3 {
  line-height: 1.4;
  margin: 0 0 10px;
}
h1 {
  font-size: 26px;
}
h2 {
  font-size: 21px;
}
h3 {
  font-size: 17px;
}
a {
  color: var(--primary);
  text-underline-offset: 3px;
}
ul,
ol {
  padding-left: 24px;
}
li {
  margin: 6px 0;
}
label {
  display: block;
  font-weight: 600;
}
input,
select,
textarea,
button {
  margin: 5px 4px 8px 0;
}
input:not([type="radio"]):not([type="checkbox"]),
select,
textarea {
  max-width: 100%;
}
textarea {
  display: block;
}
[aria-current] {
  font-weight: 700;
}
[aria-invalid="true"] {
  border-color: #e05d5d;
}
.form-field__error {
  color: #d84646;
}
figure img {
  max-width: 100%;
  height: auto;
}
figcaption,
small,
time {
  color: var(--muted);
}
.info-list__item {
  display: grid;
  grid-template-columns: minmax(80px, 1fr) 2fr;
  gap: 12px;
  padding: 8px 0;
}
dt {
  font-weight: 600;
}
dd {
  margin: 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
caption {
  font-weight: 700;
  text-align: left;
  padding: 8px 0;
}
th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid var(--border);
}
summary {
  cursor: pointer;
  font-weight: 600;
}
progress,
meter {
  display: block;
  width: min(100%, 320px);
  margin: 12px 0;
  accent-color: var(--primary);
}
dialog[open] {
  position: relative;
  inset: auto;
  margin: 12px auto;
  max-width: 100%;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
}
`;
export function buildSemanticDocument(pattern) {
  const title = pattern.label.replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );
  return `<!doctype html>\n<html lang="ko">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>${title}</title>\n</head>\n<body>\n${pattern.html}\n</body>\n</html>\n`;
}
