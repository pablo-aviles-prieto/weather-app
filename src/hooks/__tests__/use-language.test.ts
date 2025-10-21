import { describe, expect, it } from 'vitest';
import { isSupportedLanguage, useLanguage } from '@/hooks/use-language';
import i18n from '@/i18n';
import { renderHook } from '@/test/utils';

describe('useLanguage', () => {
	it('should return a supported language', () => {
		const { result } = renderHook(() => useLanguage());

		// Should return either 'en' or 'es'
		expect(['en', 'es']).toContain(result.current);
	});

	it('should return "en" as default for unsupported language', async () => {
		await i18n.changeLanguage('fr');
		const { result } = renderHook(() => useLanguage());
		expect(result.current).toBe('en');
	});

	it('should return "es" when language is Spanish', async () => {
		await i18n.changeLanguage('es');
		const { result } = renderHook(() => useLanguage());
		expect(result.current).toBe('es');
	});
});

describe('isSupportedLanguage', () => {
	it('should return true for supported languages', () => {
		expect(isSupportedLanguage('en')).toBe(true);
		expect(isSupportedLanguage('es')).toBe(true);
	});

	it('should return false for unsupported languages', () => {
		expect(isSupportedLanguage('fr')).toBe(false);
		expect(isSupportedLanguage('de')).toBe(false);
		expect(isSupportedLanguage('')).toBe(false);
	});
});
