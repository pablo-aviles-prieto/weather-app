import { Loader2 } from 'lucide-react';

export const Loader = () => (
	<div className='flex min-h-24 items-center justify-center bg-inherit' data-testid='loader'>
		<Loader2 className='size-8 animate-spin text-primary' />
	</div>
);
