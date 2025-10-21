import { Droplets } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { Forecastday, WeatherResponse } from '@/types/weather';

type HourlyForecastProps = {
	today: Forecastday;
	data: WeatherResponse;
};

export const HourlyForecast = ({ today, data }: HourlyForecastProps) => {
	const { t } = useTranslation('forecast', { keyPrefix: 'weather' });
	const nowRef = useRef<HTMLDivElement | null>(null);
	const cityLocalTime = data?.location?.localtime;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <necessary>
	useEffect(() => {
		// Cant use a simple scrollIntoView bc it would scroll the entire page vertically
		if (!nowRef.current) {
			return;
		}
		const scrollContainer = nowRef.current.parentElement;
		if (!scrollContainer) {
			return;
		}

		const containerRect = scrollContainer.getBoundingClientRect();
		const currentHourRect = nowRef.current.getBoundingClientRect();

		// Calculate position to center the current hour in the container
		const currentHourRelativeLeft = currentHourRect.left - containerRect.left;
		const containerCenter = containerRect.width / 2;
		const currentHourCenter = currentHourRect.width / 2;
		const scrollLeft = scrollContainer.scrollLeft + currentHourRelativeLeft - containerCenter + currentHourCenter;

		scrollContainer.scrollTo({
			left: scrollLeft,
			behavior: 'smooth',
		});
	}, [today]);

	return (
		<div className='space-y-6 rounded-2xl border bg-card p-6 shadow-sm'>
			<h2 className='font-bold'>{t('hourly-forecast')}</h2>
			<div className='flex gap-3 overflow-x-auto pb-2'>
				{today.hour.map((hour) => {
					const hourTime = new Date(hour.time);
					const cityNow = cityLocalTime ? new Date(cityLocalTime) : new Date();

					const isNow =
						hourTime.getFullYear() === cityNow.getFullYear() &&
						hourTime.getMonth() === cityNow.getMonth() &&
						hourTime.getDate() === cityNow.getDate() &&
						hourTime.getHours() === cityNow.getHours();

					return (
						<div
							className={cn(
								'flex min-w-[100px] flex-col items-center gap-3 rounded-xl p-4 transition-colors',
								isNow ? 'bg-primary/80 text-primary-foreground' : 'bg-muted/50 hover:bg-muted'
							)}
							key={hour.time_epoch}
							ref={isNow ? nowRef : null}
						>
							<span>
								{hourTime.toLocaleTimeString('en-US', {
									hour: '2-digit',
									hour12: false,
								})}
							</span>
							<img alt={hour.condition.text} className='size-12' src={hour.condition.icon} />
							<h2 className='lg:text-2xl'>{Math.round(hour.temp_c)}°</h2>
							<div className='flex items-center gap-1 text-muted-foreground text-xs lg:text-sm'>
								<Droplets className='size-3' />
								<span>{hour.chance_of_rain}%</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
