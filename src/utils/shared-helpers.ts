export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function avatarLetter(myTitle: any|string) {
    if (!myTitle) return myTitle;

    return myTitle.charAt(0).toUpperCase();
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}