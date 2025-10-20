import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCity } from '@/contexts/city-context';
import { CITIES } from '@/types/city';

export function CitySelector() {
	const { t } = useTranslation();
	const { selectedCity, setSelectedCity } = useCity();

	return (
		<Select onValueChange={setSelectedCity} value={selectedCity}>
			<SelectTrigger className='h-12 w-[280px]'>
				<div className='flex items-center gap-2'>
					<MapPin className='size-5 text-muted-foreground' />
					<SelectValue placeholder={t('city-dropdown.select-city')} />
				</div>
			</SelectTrigger>
			<SelectContent>
				{CITIES.map((cityName) => (
					<SelectItem key={cityName} value={cityName}>
						{t(`city.${cityName}`)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
