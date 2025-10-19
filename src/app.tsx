import { Header } from '@/components/layout/header';
import { CitySelector } from '@/features/city-selector/components/selector';

export const App = () => {
	// const { selectedCity } = useCity();

	return (
		<section className='min-h-screen'>
			<Header />
			<div className='flex justify-center'>
				<CitySelector />
			</div>
		</section>
	);
};
