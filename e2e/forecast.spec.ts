import { expect, test } from '@playwright/test';

const SELECT_A_CITY_REGEX = /select a city/i;
const LONDON_REGEX = /london/i;
const TORONTO_REGEX = /toronto/i;
const SINGAPORE_REGEX = /singapore/i;
const LONDRES_REGEX = /londres/i;
const ESPAÑOL_REGEX = /español/i;

test.describe('Weather App', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('has correct title', async ({ page }) => {
		await expect(page).toHaveTitle('Weather App');
	});

	test('renders Weather App', async ({ page }) => {
		await expect(page.getByText('Weather App')).toBeVisible();
	});

	test('shows empty state when no city is selected', async ({ page }) => {
		await expect(page.getByRole('combobox')).toBeVisible();
		await expect(page.getByText(SELECT_A_CITY_REGEX)).toBeVisible();
	});

	test('user can select a city and weather data is displayed', async ({ page }) => {
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: LONDON_REGEX }).click();
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: LONDON_REGEX })).toBeVisible();
	});

	test('user can switch between cities', async ({ page }) => {
		// Select London
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: LONDON_REGEX }).click();
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: LONDON_REGEX })).toBeVisible();

		// Switch to Toronto
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: TORONTO_REGEX }).click();
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: TORONTO_REGEX })).toBeVisible();

		// Switch to Singapore
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: SINGAPORE_REGEX }).click();
		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: SINGAPORE_REGEX })).toBeVisible();
	});

	test('weather data persists on language change', async ({ page }) => {
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: LONDON_REGEX }).click();
		await page.waitForLoadState('networkidle');
		expect(page.getByRole('heading', { name: LONDON_REGEX })).toBeVisible();

		await page.getByRole('button', { name: ESPAÑOL_REGEX }).click();
		await page.waitForLoadState('networkidle');

		await expect(page.getByRole('heading', { name: LONDRES_REGEX })).toBeVisible();
	});

	test('shows loading state while fetching weather', async ({ page }) => {
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: SINGAPORE_REGEX }).click();
		await expect(page.locator('[data-testid="loader"]')).toBeVisible();

		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: SINGAPORE_REGEX })).toBeVisible();
	});

	test('displays weather icon and condition', async ({ page }) => {
		await page.getByRole('combobox').click();
		await page.getByRole('option', { name: LONDON_REGEX }).click();

		await page.waitForLoadState('networkidle');
		await expect(page.getByRole('heading', { name: LONDON_REGEX })).toBeVisible();

		// Verifying weather icon is present
		const weatherIcon = page
			.locator('img[alt*="Clear"], img[alt*="Cloudy"], img[alt*="Rain"], img[alt*="Sunny"]')
			.first();
		await expect(weatherIcon).toBeVisible();
	});
});
