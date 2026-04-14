import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';
import { CartPage } from '../../pages/cartPage';
import { users } from '../../test-data/loginData';
import { expectInventoryPageLoaded } from '../../utils/assertions';
import { Header } from '../../pages/components/header';

test.describe('Cart Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    header = new Header(page);
    await loginPage.navigate();
  });

  test('Add items to cart and verify cart contents', async ({ page }) => {
    // Login with valid credentials
    await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);
    await expectInventoryPageLoaded(page);

    // Add items to cart
    await inventoryPage.getInventoryItemAddToCartButtons().nth(0).click();
    await inventoryPage.getInventoryItemAddToCartButtons().nth(1).click();
    await expect(header.getCartBadge()).toBeVisible();
    await expect(header.getCartBadge()).toHaveText('2');

    // Navigate to cart page and verify cart items
    await expect(inventoryPage.getShoppingCartLink()).toBeVisible();
    await header.navigateToCartPage();
    await expect(cartPage.getCartItems()).toHaveCount(2);

    // Remove one item from the cart and verify the remaining item
    await cartPage.getCartItemRemoveButtons().nth(0).click();
    await expect(cartPage.getCartItems()).toHaveCount(1);

    // Remove the remaining item from the cart
    await cartPage.getCartItemRemoveButtons().nth(0).click();
    await expect(cartPage.getCartItems()).toHaveCount(0);

    // Navigate back to inventory page
    await cartPage.navigateBackToInventoryPage();
    await expectInventoryPageLoaded(page);

  });

});