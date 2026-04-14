import { Page } from '@playwright/test';

export class CheckoutStep1Page {
  constructor(private page: Page) {}

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
  }

  async continue() {
    await this.page.click('#continue');
  }

  getErrorMessage() {
    return this.page.locator('[data-test="error"]');
  }

}