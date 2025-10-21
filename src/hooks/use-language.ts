import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '@/i18n';

export const isSupportedLanguage = (lang: string): lang is SupportedLanguage => lang === 'en' || lang === 'es';

export const useLanguage = (): SupportedLanguage => {
	const { i18n } = useTranslation();
	return isSupportedLanguage(i18n.language) ? i18n.language : 'en';
};
