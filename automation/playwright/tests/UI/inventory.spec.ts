import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';
import { users } from '../../test-data/loginData';
import { expectInventoryPageLoaded } from '../../utils/assertions';

test.describe('Inventory Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
  });

  test('Inventory page loads correctly', async ({ page }) => {

    // Login with valid credentials
    await loginPage.navigate();
    await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);
    await expectInventoryPageLoaded(page);

    // Verify inventory items
    await expect(inventoryPage.getInventoryItems()).toHaveCount(6);
    await expect(inventoryPage.getInventoryItemNames()).toHaveText([
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
      'Sauce Labs Fleece Jacket',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);
    await expect(inventoryPage.getInventoryItemPrices()).toHaveText([
      '$29.99',
      '$9.99',
      '$15.99',
      '$49.99',
      '$7.99',
      '$15.99',
    ]);

  });

});