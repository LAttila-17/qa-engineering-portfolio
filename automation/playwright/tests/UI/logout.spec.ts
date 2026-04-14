import { test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';
import { users } from '../../test-data/loginData';
import { expectInventoryPageLoaded, expectLoginPageLoaded } from '../../utils/assertions';
import { Header } from '../../pages/components/header';

test.describe('Logout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    header = new Header(page);
    await loginPage.navigate();
  });

  test('Logout from the application', async ({ page }) => {
    // Login with valid credentials
    await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);
    await expectInventoryPageLoaded(page);

    // Open the menu and click on the logout link
    await header.openMenu();
    await header.clickLogout();

    // Assertions for successful logout
    await expectLoginPageLoaded(page);

  });

});