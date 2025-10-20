import { CityProvider } from '@/contexts/city-context';
import { QueryClientProviderWrapper } from '@/providers/query-client';

export const Providers = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProviderWrapper>
		<CityProvider>{children}</CityProvider>
	</QueryClientProviderWrapper>
);
