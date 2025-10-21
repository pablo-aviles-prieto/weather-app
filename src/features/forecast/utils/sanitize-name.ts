export const sanitizeName = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');
