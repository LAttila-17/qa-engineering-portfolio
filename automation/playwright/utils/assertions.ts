import { expect, Page } from '@playwright/test';

// Assertion function to verify that the inventory page is loaded successfully
export async function expectInventoryPageLoaded(page: Page) {
  await page.waitForURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
}

// Assertion function to verify that the login page is loaded successfully
export async function expectLoginPageLoaded(page: Page) {
  await page.waitForURL('/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
  await expect(page.locator('.inventory_list')).toBeHidden();
}

// Assertion function to verify that the error message is displayed with the expected text
export async function expectErrorMessage(page: Page, errorMessage: string) {
  const errorLocator = page.locator('[data-test="error"]');
  await expect(errorLocator).toBeVisible();
  await expect(errorLocator).toHaveText(errorMessage);
}

// Assertion function to verify that the About page is loaded successfully
export async function expectAboutPageLoaded(page: Page) {
  await expect(page).toHaveURL('https://saucelabs.com/');
}

// Assertion function to verify that the checkout overview page is loaded successfully
export async function expectOverviewPageLoaded(page: Page) {
  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview');
}

// Verify order summary data
export async function expectOrderSummaryData(page: Page) {
  await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
}

// Verify we're on the finish page
export async function expectFinishPageLoaded(page: Page) {
     await expect(page).toHaveURL(/checkout-complete/);
     await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
     await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
}