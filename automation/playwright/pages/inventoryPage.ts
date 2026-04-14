import { Page } from '@playwright/test';

export class InventoryPage {

  constructor(private page: Page) {}

  // Get the inventory items on the page
  getInventoryItems() {
    return this.page.locator('.inventory_item');
  }

  // Get the shopping cart link on the page
  getShoppingCartLink() {
    return this.page.locator('.shopping_cart_link');
  }

  // Get the inventory item names on the page
  getInventoryItemNames() {
    return this.page.locator('.inventory_item_name');
  }

  // Get the inventory item prices on the page
  getInventoryItemPrices() {
    return this.page.locator('.inventory_item_price');
  }

  // Get the inventory item add to cart buttons on the page
  getInventoryItemAddToCartButtons() {
    return this.page.locator('.btn_inventory');
  }

  // Get the inventory item remove buttons on the page
  getInventoryItemRemoveButtons() {
    return this.page.locator('.inventory_item_remove_button');
  }

}