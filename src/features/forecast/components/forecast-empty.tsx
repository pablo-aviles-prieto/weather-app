import { Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ForecastEmpty = () => {
	const { t } = useTranslation('forecast');

	return (
		<div className='py-12 text-center'>
			<Cloud className='mx-auto mb-4 size-16 text-muted-foreground' />
			<p className='text-lg text-muted-foreground'>{t('select-city')}</p>
		</div>
	);
};
