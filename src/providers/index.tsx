import { CityProvider } from '@/contexts/city-context';

export const Providers = ({ children }: { children: React.ReactNode }) => <CityProvider>{children}</CityProvider>;
