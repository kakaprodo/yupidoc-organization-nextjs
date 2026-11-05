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

    // Treat the empty paragraph emitted by rich-text editors as empty content.
    if (!value || value == "<p><br></p>") return true;

    return value?.length === 0;
}

export const sizeClasses: Record<number, string> = {
    2: "h-2 w-2",
    3: "h-3 w-3",
    4: "h-4 w-4",
    5: "h-5 w-5",
    6: "h-6 w-6",
    7: "h-7 w-7",
    8: "h-8 w-8",
    9: "h-9 w-9",
    10: "h-10 w-10",
    11: "h-11 w-11",
    12: "h-12 w-12",
};