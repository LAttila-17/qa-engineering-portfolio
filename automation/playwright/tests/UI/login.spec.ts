import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { users } from '../../test-data/loginData';
import { loginErrors } from '../../test-data/errorMessages';
import { expectInventoryPageLoaded, expectErrorMessage } from '../../utils/assertions';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login with valid credentials', async ({ page }) => {
    // Login with valid credentials and verify successful login
    await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);
    await expectInventoryPageLoaded(page);
  });

  test('Login with invalid username', async ({ page }) => {
    // Login with invalid username and valid password and verify unsuccessful login
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    await expectErrorMessage(page, loginErrors.invalidCredentials);
  });

  test('Login with invalid password', async ({ page }) => {
    // Login with valid username but invalid password and verify unsuccessful login
    await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    await expectErrorMessage(page, loginErrors.invalidCredentials);
  });

  test('Login without username', async ({ page }) => {
    // Login without username but with valid password and verify unsuccessful login
    await loginPage.login('', users.validUserPassword.password);
    await expectErrorMessage(page, loginErrors.missingUsername);
  });

  test('Login without password', async ({ page }) => {
    // Login with valid username but without password and verify unsuccessful login
    await loginPage.login(users.validUserPassword.username, '');
    await expectErrorMessage(page, loginErrors.missingPassword);
  });

});