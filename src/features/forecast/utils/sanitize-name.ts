export const SanitizeName = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');
