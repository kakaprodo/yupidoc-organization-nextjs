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

export function isEmpty(value: any) {
    if (!value) return true;

    // for the quill editor default value
    if (!value || value == "<p><br></p>") return true;

    return value?.length === 0;
}