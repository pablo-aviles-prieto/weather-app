import { useTranslation } from 'react-i18next';

type ForecastErrorProps = {
	error: Error;
};

export const ForecastError = ({ error }: ForecastErrorProps) => {
	const { t } = useTranslation('forecast');

	return (
		<div className='rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive'>
			<p className='font-semibold'>{t('error.generic')}</p>
			<p className='text-sm'>{error.message}</p>
		</div>
	);
};
