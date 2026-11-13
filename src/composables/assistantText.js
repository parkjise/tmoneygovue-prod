// Keep whole question/answer pairs, without storing conversations in localStorage.
export function buildConversation(messages, question) {
  const history = [{ role: 'user', content: question.trim() }];
  let total = question.trim().length;
  for (let i = messages.length - 2; i >= 0; i -= 2) {
    const user = messages[i],
      assistant = messages[i + 1];
    if (user.role !== 'user' || assistant?.role !== 'assistant') break;
    if (history.length + 2 > 19 || total + user.content.length + assistant.content.length > 20000)
      break;
    history.unshift(
      { role: 'user', content: user.content },
      { role: 'assistant', content: assistant.content }
    );
    total += user.content.length + assistant.content.length;
  }
  return history;
}
// Render code fences through Vue text bindings, never v-html or untrusted Markdown HTML.
export function answerBlocks(text) {
  const blocks = [];
  let end = 0;
  const pattern = /```([^\n`]*)\n([\s\S]*?)```/g;
  for (const match of text.matchAll(pattern)) {
    if (match.index > end) blocks.push({ type: 'text', text: text.slice(end, match.index) });
    blocks.push({ type: 'code', language: match[1].trim(), text: match[2] });
    end = match.index + match[0].length;
  }
  if (end < text.length) blocks.push({ type: 'text', text: text.slice(end) });
  return blocks;
}
