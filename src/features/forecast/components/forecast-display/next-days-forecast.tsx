import { Droplets } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/use-language';
import type { WeatherResponse } from '@/types/weather';

type NextDaysForecastProps = {
	data: WeatherResponse;
};

const PERCENTAGE_FACTOR = 100;

export const NextDaysForecast = ({ data }: NextDaysForecastProps) => {
	const { t } = useTranslation('forecast', { keyPrefix: 'weather' });
	const locale = useLanguage();

	return (
		<div className='space-y-6 rounded-2xl border bg-card p-6 shadow-sm'>
			<h2 className='font-bold'>{t('next-days-forecast.title', { 'days-number': 3 })}</h2>
			<div className='space-y-3 overflow-hidden'>
				{data.forecast.forecastday.map((day, index) => {
					const date = new Date(day.date);
					const isToday = index === 0;
					const ranges = data.forecast.forecastday.map((d) => d.day.maxtemp_c - d.day.mintemp_c);
					const maxRange = Math.max(...ranges);

					return (
						<div
							className='flex items-center justify-between rounded-xl bg-muted/30 p-4 transition-colors hover:bg-muted/50'
							key={day.date_epoch}
						>
							<div className='flex items-center gap-4'>
								<span className='min-w-12'>
									{isToday
										? t('next-days-forecast.today')
										: date.toLocaleDateString(locale, {
												weekday: 'short',
											})}
								</span>
								<img
									alt={day.day.condition.text}
									className='size-10'
									src={day.day.condition.icon || '/placeholder.svg'}
								/>
								<span className='text-muted-foreground'>{day.day.condition.text}</span>
							</div>

							<div className='flex items-center gap-6'>
								<div className='flex items-center gap-2'>
									<Droplets className='h-4 w-4 text-blue-500' />
									<span>{day.day.daily_chance_of_rain}%</span>
								</div>
								<div className='hidden items-center gap-3 sm:flex'>
									<span className='text-muted-foreground'>{Math.round(day.day.mintemp_c)}°</span>
									<div className='h-1.5 w-20 overflow-hidden rounded-full bg-muted'>
										<div
											className='h-full bg-gradient-to-r from-blue-400 to-orange-400'
											style={{
												width: `${((day.day.maxtemp_c - day.day.mintemp_c) / maxRange) * PERCENTAGE_FACTOR}%`,
											}}
										/>
									</div>
									<span className='font-semibold'>{Math.round(day.day.maxtemp_c)}°</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
