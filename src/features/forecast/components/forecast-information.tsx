import { useQuery } from '@tanstack/react-query';
import { useCity } from '@/contexts/city-context';
import { useLanguage } from '@/hooks/use-language';
import weatherRepository from '@/services/weaher-repository';

export const ForecastInformation = () => {
	const { selectedCity } = useCity();
	const currentLanguage = useLanguage();
	const { data: _data } = useQuery(weatherRepository.getWeatherDetails(selectedCity, currentLanguage));

	if (!selectedCity) {
		return null;
	}

	return <div>Test</div>;
};
