import { Page } from '@playwright/test';

export class Header {

  constructor(private page: Page) {}

  // Open the header menu
  async openMenu() {
    await this.page.click('#react-burger-menu-btn');
  }

  // Click on the "About" link in the header menu
  async clickAbout() {
    await this.page.click('#about_sidebar_link');
  }

  // Click on the "Logout" link in the header menu
  async clickLogout() {
    await this.page.click('#logout_sidebar_link');
  }

  // Navigate to the cart page
  async navigateToCartPage() {
    await this.page.click('.shopping_cart_link');
  }

  // Get the shopping cart badge element
  getCartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

}