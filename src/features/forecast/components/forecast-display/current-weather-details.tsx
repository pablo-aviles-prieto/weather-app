import { Cloud, Droplets, Eye, Gauge, Sun, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { WeatherResponse } from '@/types/weather';

type CurrentWeatherDetailsProps = {
	data: WeatherResponse;
};

type WeatherDetail = {
	icon: React.ElementType;
	translationKey: string;
	getValue: (data: WeatherResponse) => string | number;
};

const weatherDetails: WeatherDetail[] = [
	{ icon: Droplets, translationKey: 'details.humidity', getValue: (d) => `${d.current.humidity}%` },
	{ icon: Wind, translationKey: 'details.wind', getValue: (d) => `${Math.round(d.current.wind_kph)} km/h` },
	{ icon: Gauge, translationKey: 'details.pressure', getValue: (d) => `${Math.round(d.current.pressure_mb)} mb` },
	{ icon: Eye, translationKey: 'details.visibility', getValue: (d) => `${Math.round(d.current.vis_km)} km` },
	{ icon: Sun, translationKey: 'details.uv-index', getValue: (d) => d.current.uv },
	{ icon: Cloud, translationKey: 'details.precipitation', getValue: (d) => `${d.current.precip_mm} mm` },
];

export const CurrentWeatherDetails = ({ data }: CurrentWeatherDetailsProps) => {
	const { t } = useTranslation('forecast', { keyPrefix: 'weather' });

	return (
		<div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6'>
			{weatherDetails.map(({ icon: Icon, translationKey, getValue }) => (
				<div className='space-y-2 rounded-xl border bg-card p-4 shadow-sm' key={translationKey}>
					<div className='flex items-center gap-2 text-muted-foreground'>
						<Icon className='size-4' />
						<span className='truncate'>{t(translationKey)}</span>
					</div>
					<h2 className='truncate lg:text-2xl'>{getValue(data)}</h2>
				</div>
			))}
		</div>
	);
};
