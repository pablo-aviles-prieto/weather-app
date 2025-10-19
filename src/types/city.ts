export const CITIES = ['london', 'toronto', 'singapore'] as const;
export type City = (typeof CITIES)[number];
