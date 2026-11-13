/** Extract a complete outer SFC block, preserving nested <template> elements. */
export function extractBlock(source, tag) {
  const start = source.search(new RegExp('^<' + tag + '\\b[^>]*>', 'm'));
  const openingEnd = source.indexOf('>', start);
  const end = source.lastIndexOf('</' + tag + '>');
  return start >= 0 && openingEnd >= 0 && end > openingEnd
    ? source.slice(openingEnd + 1, end).trim()
    : '';
}
