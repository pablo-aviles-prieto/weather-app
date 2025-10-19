import { useTranslation } from 'react-i18next';
import { SelectorButton } from '@/features/language-selector/components/button';

export function LanguageSelector() {
	const { i18n } = useTranslation();

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className='flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-1'>
			<SelectorButton changeLanguage={() => changeLanguage('en')} isSelected={i18n.language === 'en'}>
				🇬🇧 English
			</SelectorButton>
			<SelectorButton changeLanguage={() => changeLanguage('es')} isSelected={i18n.language === 'es'}>
				🇪🇸 Español
			</SelectorButton>
		</div>
	);
}
