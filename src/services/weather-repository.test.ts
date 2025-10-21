/** biome-ignore-all lint/complexity/useLiteralKeys: <using string literal since is a private method> */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import weatherRepository from './weaher-repository';

global.fetch = vi.fn();

describe('WeatherRepository', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('fetchWeather', () => {
		it('should throw error when city is undefined', async () => {
			await expect(weatherRepository['fetchWeather'](undefined, 'en')).rejects.toThrow('Invalid city');
		});

		it('should throw error when fetch fails', async () => {
			(global.fetch as any).mockResolvedValueOnce({
				ok: false,
			});

			await expect(weatherRepository['fetchWeather']('London', 'en')).rejects.toThrow('Failed to fetch weather');
		});

		it('should return weather data on success', async () => {
			const mockData = { location: { name: 'London' } };

			(global.fetch as any).mockResolvedValueOnce({
				ok: true,
				json: async () => mockData,
			});

			const result = await weatherRepository['fetchWeather']('London', 'en');

			expect(result).toEqual(mockData);
		});
	});

	describe('getWeatherDetails', () => {
		it('should return query options with enabled true when city exists', () => {
			const options = weatherRepository.getWeatherDetails('London', 'en');

			expect(options.queryKey).toEqual(['weather', 'London', 'en']);
			expect(options.enabled).toBe(true);
		});

		it('should return query options with enabled false when city is undefined', () => {
			const options = weatherRepository.getWeatherDetails(undefined, 'en');

			expect(options.enabled).toBe(false);
		});
	});
});
