import { Sunrise, Sunset } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Forecastday } from '@/types/weather';

type DaylightHoursProps = {
	today: Forecastday;
};

type DaylightMapperItem = {
	icon: React.ElementType;
	bg: string;
	color: string;
	titleKey: string;
	getValue: (day: Forecastday) => string;
};

export const daylightMapper: DaylightMapperItem[] = [
	{
		icon: Sunrise,
		bg: 'bg-orange-100',
		color: 'text-orange-600',
		titleKey: 'sunrise',
		getValue: (day) => day.astro.sunrise,
	},
	{
		icon: Sunset,
		bg: 'bg-indigo-100',
		color: 'text-indigo-600',
		titleKey: 'sunset',
		getValue: (day) => day.astro.sunset,
	},
];

export const DaylightHours = ({ today }: DaylightHoursProps) => {
	const { t } = useTranslation('forecast', { keyPrefix: 'weather.daylight' });

	return (
		<div className='grid gap-4 sm:grid-cols-2'>
			{daylightMapper.map(({ icon: Icon, bg, color, titleKey, getValue }) => (
				<div className='rounded-2xl border bg-card p-6 shadow-sm' key={titleKey}>
					<div className='flex items-center gap-3'>
						<div className={`rounded-full p-3 ${bg}`}>
							<Icon className={`size-6 ${color}`} />
						</div>
						<div>
							<p className='text-muted-foreground'>{t(titleKey)}</p>
							<h2>{getValue(today)}</h2>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
