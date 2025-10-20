import { describe, expect, it } from 'vitest';
import { App } from '@/app';
import { render } from '@/test/utils';

describe('App', () => {
	it('renders Weather App', () => {
		const { getByText } = render(<App />);
		expect(getByText('Weather App')).toBeInTheDocument();
	});
});
