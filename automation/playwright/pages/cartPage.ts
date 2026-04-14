import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Get the cart items on the page
  getCartItems() {
    return this.page.locator('.cart_item');
  }

  // Get the cart item remove buttons on the page
  getCartItemRemoveButtons() {
    return this.page.locator('.cart_button').filter({ hasText: 'Remove' });
  }

  // Navigate back to the inventory page
  async navigateBackToInventoryPage() {
    await this.page.click('[data-test="continue-shopping"]');
  }

  // Click on the checkout button
  async navigateToCheckoutStep1Page() {
    await this.page.click('[data-test="checkout"]');
  }

}
