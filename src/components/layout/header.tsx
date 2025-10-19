import { Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/features/language-selector/components/selector';

export const Header = () => {
	const { t } = useTranslation();

	return (
		<header className='flex items-center justify-between px-6 py-4'>
			<div className='flex items-center gap-3'>
				<Cloud className='size-8 text-primary' />
				<h2 className='text-foreground'>{t('title')}</h2>
			</div>
			<LanguageSelector />
		</header>
	);
};
