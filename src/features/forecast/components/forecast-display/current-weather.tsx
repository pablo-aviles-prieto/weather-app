import { useTranslation } from 'react-i18next';
import { sanitizeName } from '@/features/forecast/utils/sanitize-name';
import { useLanguage } from '@/hooks/use-language';
import type { Forecastday, WeatherResponse } from '@/types/weather';

type CurrentWeatherProps = {
	data: WeatherResponse;
	today: Forecastday;
};

export const CurrentWeather = ({ data, today }: CurrentWeatherProps) => {
	const { t } = useTranslation(['common', 'forecast']);
	const locale = useLanguage();

	return (
		<div className='relative overflow-hidden rounded-2xl border bg-gradient-to-br from-sky-500 to-blue-600 p-8 text-white shadow-lg'>
			<div className='relative z-10 space-y-8'>
				<div className='flex items-start justify-between'>
					<div className='space-y-2'>
						<h2 className='font-bold text-4xl tracking-tight'>{t(`city.${sanitizeName(data.location.name)}`)}</h2>
						<p className='text-lg text-sky-100 lg:text-xl'>{t(`country.${sanitizeName(data.location.country)}`)}</p>
						<p className='text-sky-100'>
							{new Date().toLocaleDateString(locale, {
								weekday: 'long',
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
					</div>
					<img alt={data.current.condition.text} className='size-24 drop-shadow-lg' src={data.current.condition.icon} />
				</div>

				<div className='flex items-end gap-6'>
					<h2 className='font-bold text-8xl tracking-tighter'>{Math.round(data.current.temp_c)}°</h2>
					<div className='mb-4 space-y-1'>
						<p className='font-medium text-2xl'>{data.current.condition.text}</p>
						<p className='text-sky-100'>
							{t('forecast:weather.feels-like')} {Math.round(data.current.feelslike_c)}°C
						</p>
					</div>
				</div>

				<div className='flex gap-4'>
					<TempDisplayer temperature={today.day.mintemp_c} title={t('forecast:weather.min')} />
					<TempDisplayer temperature={today.day.maxtemp_c} title={t('forecast:weather.max')} />
				</div>
			</div>
		</div>
	);
};

function TempDisplayer({ temperature, title }: { temperature: number; title: string }) {
	return (
		<div className='rounded-lg bg-white/20 px-4 py-2 backdrop-blur-sm'>
			<span className='text-sky-100'>{title}</span>
			<p className='font-semibold text-lg lg:text-xl'>{Math.round(temperature)}°</p>
		</div>
	);
}
