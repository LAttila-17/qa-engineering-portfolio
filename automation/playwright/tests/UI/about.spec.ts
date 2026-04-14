import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { users } from '../../test-data/loginData';
import { expectInventoryPageLoaded, expectAboutPageLoaded } from '../../utils/assertions';
import { Header } from '../../pages/components/header';

//About Tests
test.describe('About Tests', () => {
    let loginPage: LoginPage;
    let header: Header;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    header = new Header(page);
    await loginPage.navigate();
  });

  test('Navigate to the about page', async ({ page }) => {
    // Login with valid credentials
    await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);
    await expectInventoryPageLoaded(page);

    // Open the menu and click on the about link
    await header.openMenu();
    await header.clickAbout();

    // Assertions for successful navigation to the about page
    await expectAboutPageLoaded(page);
  });

});
