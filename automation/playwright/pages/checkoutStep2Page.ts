import { Page } from '@playwright/test';

export class CheckoutStep2Page {
  constructor(private page: Page) {}

  getSummaryItems() {
    return this.page.locator('.cart_item');
  }

  async finish() {
    await this.page.click('#finish');
  }
}