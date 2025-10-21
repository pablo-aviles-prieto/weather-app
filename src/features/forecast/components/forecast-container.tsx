/** biome-ignore-all lint/style/useBlockStatements: <improves readability> */
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/components/loader';
import { useCity } from '@/contexts/city-context';
import { WeatherDisplay } from '@/features/forecast/components/forecast-display';
import { ForecastEmpty } from '@/features/forecast/components/forecast-empty';
import { ForecastError } from '@/features/forecast/components/forecast-error';
import { useLanguage } from '@/hooks/use-language';
import weatherRepository from '@/services/weaher-repository';

export const ForecastContainer = () => {
	const { selectedCity } = useCity();
	const currentLanguage = useLanguage();
	const { data, isLoading, error } = useQuery(weatherRepository.getWeatherDetails(selectedCity, currentLanguage));

	if (!selectedCity) return <ForecastEmpty />;
	if (isLoading) return <Loader />;
	if (error) return <ForecastError error={error} />;

	return <WeatherDisplay data={data} />;
};
