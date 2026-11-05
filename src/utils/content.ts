export function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function stripMarkdown(input: string) {
  return input
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[>*_~`-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function excerpt(input: string, maxLength = 160) {
  const text = stripHtml(input);
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

