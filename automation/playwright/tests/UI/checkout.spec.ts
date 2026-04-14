import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { InventoryPage } from '../../pages/inventoryPage';
import { CartPage } from '../../pages/cartPage';
import { CheckoutStep1Page } from '../../pages/checkoutStep1Page';
import { CheckoutStep2Page } from '../../pages/checkoutStep2Page';
import { CheckoutCompletePage } from '../../pages/checkoutCompletePage';
import { checkoutErrors } from '../../test-data/errorMessages';
import { users } from '../../test-data/loginData';
import { expectInventoryPageLoaded, expectOverviewPageLoaded, expectOrderSummaryData, expectFinishPageLoaded, expectErrorMessage } from '../../utils/assertions';
import { Header } from '../../pages/components/header';

test.describe('Checkout Process', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let header: Header;
  let checkoutStep1Page: CheckoutStep1Page;
  let checkoutStep2Page: CheckoutStep2Page;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    header = new Header(page);
    checkoutStep1Page = new CheckoutStep1Page(page);
    checkoutStep2Page = new CheckoutStep2Page(page);
    checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.navigate();
  });

  test('Complete checkout process', async ({ page }) => {
    // Login with valid credentials
    await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);
    await expectInventoryPageLoaded(page);

    // Add item to cart
    await inventoryPage.getInventoryItemAddToCartButtons().first().click();

    // Navigate to cart page
    await header.navigateToCartPage();

    // Click checkout button
    await cartPage.navigateToCheckoutStep1Page();

    // Continue without filling information to verify error messages
    await checkoutStep1Page.continue();
    await expectErrorMessage(page, checkoutErrors.missingFirstName);

    // Fill only first name and continue
    await checkoutStep1Page.fillInformation('Test', '', '');
    await checkoutStep1Page.continue();
    await expectErrorMessage(page, checkoutErrors.missingLastName);

    // Fill first name and last name but not postal code and continue
    await checkoutStep1Page.fillInformation('Test', 'Lll', '');
    await checkoutStep1Page.continue();
    await expectErrorMessage(page, checkoutErrors.missingPostalCode);

    // Fill all required information and continue
    await checkoutStep1Page.fillInformation('Test', 'Lll', '1111');
    await checkoutStep1Page.continue();

    // Verify we're on checkout-step-two and verify order summary data
    await expectOverviewPageLoaded(page);
    await expectOrderSummaryData(page);

    // Complete the purchase - step 2
    await checkoutStep2Page.finish();

    // Verify we're on the finish page
    await expectFinishPageLoaded(page);

  });

});