import { CurrentWeather } from '@/features/forecast/components/forecast-display/current-weather';
import { CurrentWeatherDetails } from '@/features/forecast/components/forecast-display/current-weather-details';
import { DaylightHours } from '@/features/forecast/components/forecast-display/daylight-hours';
import { HourlyForecast } from '@/features/forecast/components/forecast-display/hourly-forecast';
import { NextDaysForecast } from '@/features/forecast/components/forecast-display/next-days-forecast';
import type { WeatherResponse } from '@/types/weather';

type WeatherDisplayProps = {
	data: WeatherResponse | undefined;
};

export function WeatherDisplay({ data }: WeatherDisplayProps) {
	if (!data) {
		return null;
	}

	const today = data.forecast.forecastday[0];

	return (
		<div className='mx-auto space-y-6'>
			<CurrentWeather data={data} today={today} />
			<CurrentWeatherDetails data={data} />
			<HourlyForecast data={data} today={today} />
			<NextDaysForecast data={data} />
			<DaylightHours today={today} />
		</div>
	);
}
