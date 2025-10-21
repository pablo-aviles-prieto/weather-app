import { Header } from '@/components/layout/header';
import { CitySelector } from '@/features/city-selector/components/selector';
import { ForecastContainer } from '@/features/forecast/components/forecast-container';

export const App = () => (
	<section className='mx-auto min-h-screen max-w-5xl space-y-10 px-2 pb-10 lg:space-y-12 lg:px-4'>
		<Header />
		<div className='flex justify-center'>
			<CitySelector />
		</div>
		<ForecastContainer />
	</section>
);
