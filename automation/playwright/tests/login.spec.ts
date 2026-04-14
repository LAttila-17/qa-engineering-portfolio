import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { users } from '../test-data/loginData';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

test('Successful login with valid user', async ({ page }) => {
  // Login with valid credentials
  await loginPage.login(users.validUserPassword.username, users.validUserPassword.password);

  // Assertions for successful login
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
  await expect(page.locator('.inventory_item')).toHaveCount(6);
  await expect(page.locator('.inventory_item_name')).toHaveText([
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ]);
  await expect(page.locator('.inventory_item_price')).toHaveText([
    '$29.99',
    '$9.99',
    '$15.99',
    '$49.99',
    '$7.99',
    '$15.99',
  ]);
  await expect(page.locator('.shopping_cart_link')).toBeVisible();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  await expect(page.locator('.error-message-container')).toBeHidden();

});

test('Login with valid user - invalid password', async ({ page }) => {
  // Login with valid username but invalid password
  await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);

  // Assertions for unsuccessful login due to invalid password
  await expect(await loginPage.getErrorMessage()).toBeVisible();
  await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page).toHaveURL('/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
  await expect(page.locator('.inventory_list')).toBeHidden();
  await expect(page.locator('.inventory_item')).toBeHidden();
  await expect(page.locator('.inventory_item_name')).toBeHidden();
  await expect(page.locator('.inventory_item_price')).toBeHidden();
  await expect(page.locator('.shopping_cart_link')).toBeHidden();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  await expect(page.locator('.error-message-container')).toBeVisible();
  await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveClass(/error/);
  
});

test('Login with invalid user', async ({ page }) => {
  // Login with invalid username and valid password
  await loginPage.login(users.invalidUser.username, users.invalidUser.password);

  // Assertions for unsuccessful login due to invalid user
  await expect(await loginPage.getErrorMessage()).toBeVisible();
  await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page).toHaveURL('/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible(); 
  await expect(page.locator('#login-button')).toBeVisible();
  await expect(page.locator('.inventory_list')).toBeHidden();
  await expect(page.locator('.inventory_item')).toBeHidden();
  await expect(page.locator('.inventory_item_name')).toBeHidden();
  await expect(page.locator('.inventory_item_price')).toBeHidden();
  await expect(page.locator('.shopping_cart_link')).toBeHidden();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  await expect(page.locator('.error-message-container')).toBeVisible();
  await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.locator('.error-message-container')).toHaveClass(/error/);

});

test('Login without username - just password', async ({ page }) => {
  // Login without username but with valid password
  await loginPage.login('', users.validUserPassword.password);

  // Assertions for unsuccessful login due to missing username
  await expect(await loginPage.getErrorMessage()).toBeVisible();
  await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Username is required');
  await expect(page).toHaveURL('/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
  await expect(page.locator('.inventory_list')).toBeHidden();
  await expect(page.locator('.inventory_item')).toBeHidden();
  await expect(page.locator('.inventory_item_name')).toBeHidden();
  await expect(page.locator('.inventory_item_price')).toBeHidden();
  await expect(page.locator('.shopping_cart_link')).toBeHidden();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  await expect(page.locator('.error-message-container')).toBeVisible();
  await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username is required');
  await expect(page.locator('.error-message-container')).toHaveClass(/error/);
});

test('Login without password - just username', async ({ page }) => {
  // Login with valid username but without password
  await loginPage.login(users.validUserPassword.username, '');

  // Assertions for unsuccessful login due to missing password
  await expect(await loginPage.getErrorMessage()).toBeVisible();
  await expect(await loginPage.getErrorMessage()).toHaveText('Epic sadface: Password is required');
  await expect(page).toHaveURL('/');
  await expect(page.locator('#user-name')).toBeVisible();
  await expect(page.locator('#password')).toBeVisible();
  await expect(page.locator('#login-button')).toBeVisible();
  await expect(page.locator('.inventory_list')).toBeHidden();
  await expect(page.locator('.inventory_item')).toBeHidden();
  await expect(page.locator('.inventory_item_name')).toBeHidden();
  await expect(page.locator('.inventory_item_price')).toBeHidden();
  await expect(page.locator('.shopping_cart_link')).toBeHidden();
  await expect(page.locator('.shopping_cart_badge')).toBeHidden();
  await expect(page.locator('.error-message-container')).toBeVisible();
  await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Password is required');
  await expect(page.locator('.error-message-container')).toHaveClass(/error/);
});

});