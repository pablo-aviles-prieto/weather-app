import { QueryClient, queryOptions } from '@tanstack/react-query';
import type { SupportedLanguage } from '@/i18n';
import type { WeatherResponse } from '@/types/weather';

class WeatherRepository {
	endpoint: string;
	apiKey: string;
	queryClient: QueryClient;

	constructor() {
		this.endpoint = import.meta.env.VITE_API_WEATHER_ENDPOINT;
		this.apiKey = import.meta.env.VITE_API_WEATHER_KEY;
		this.queryClient = new QueryClient();

		if (!this.endpoint) {
			throw new Error('Missing VITE_API_WEATHER_KEY in environment variables');
		}
	}

	private async fetchWeather(city: string | undefined, lang: SupportedLanguage): Promise<WeatherResponse> {
		if (!city) {
			throw new Error('Invalid city');
		}
		const url = `${this.endpoint}/forecast.json?key=${this.apiKey}&q=${city}&days=3&lang=${lang}`;
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error('Failed to fetch weather');
		}
		return res.json();
	}

	getWeatherDetails(city: string | undefined, lang: SupportedLanguage) {
		return queryOptions({
			queryKey: ['weather', city, lang],
			queryFn: async () => this.fetchWeather(city, lang),
			enabled: Boolean(city && lang),
		});
	}
}

export default new WeatherRepository();
