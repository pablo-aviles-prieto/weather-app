import { createContext, type ReactNode, useContext, useState } from 'react';
import type { City } from '@/types/city';

type CityContextType = {
	selectedCity: City | undefined;
	setSelectedCity: (city: City) => void;
};

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
	const [selectedCity, setSelectedCity] = useState<CityContextType['selectedCity']>(undefined);

	return <CityContext.Provider value={{ selectedCity, setSelectedCity }}>{children}</CityContext.Provider>;
}

export function useCity() {
	const context = useContext(CityContext);
	if (!context) {
		throw new Error('useCity must be used within CityProvider');
	}
	return context;
}
