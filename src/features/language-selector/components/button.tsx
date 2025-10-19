import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SelectorButtonProps = {
	changeLanguage: () => void;
	isSelected: boolean;
	children: React.ReactNode;
};

export const SelectorButton = ({ children, changeLanguage, isSelected }: SelectorButtonProps) => (
	<Button
		className={cn(
			'h-8 px-3 font-medium text-sm transition-all',
			isSelected ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
		)}
		onClick={changeLanguage}
		size='sm'
		variant='ghost'
	>
		{children}
	</Button>
);
