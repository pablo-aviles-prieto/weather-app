import { expect, test } from '@playwright/test';

test('has correct title', async ({ page }) => {
	await page.goto('/');
	await expect(page).toHaveTitle('Weather App');
});

test('renders Weather App', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByText('Weather App')).toBeVisible();
});
