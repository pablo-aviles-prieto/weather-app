import { describe, expect, it } from 'vitest';
import { sanitizeName } from '@/features/forecast/utils/sanitize-name';

describe('sanitizeName', () => {
	it('should convert to lowercase', () => {
		expect(sanitizeName('London')).toBe('london');
	});

	it('should replace spaces with hyphens', () => {
		expect(sanitizeName('New York')).toBe('new-york');
	});

	it('should replace multiple spaces with single hyphen', () => {
		expect(sanitizeName('San   Francisco')).toBe('san-francisco');
	});

	it('should handle already formatted names', () => {
		expect(sanitizeName('paris')).toBe('paris');
	});

	it('should handle mixed case with spaces', () => {
		expect(sanitizeName('A Coruña')).toBe('a-coruña');
	});
});
