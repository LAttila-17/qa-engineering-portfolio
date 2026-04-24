import { test, expect, request } from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';
import { login } from '../../clients/authClient';
import { faker } from '@faker-js/faker';

test.describe('Login API Tests', () => {

    test('Successful login', async () => {
        const apiContext = await createApiContext();
        const token = await login(apiContext, 'testlll', '123');
        expect(token).toBeTruthy();
    });

    test('Failed login with random invalid credentials', async () => {
        const apiContext = await createApiContext();

        // Generate random username and password using faker
        const randomUsername = faker.internet.username();
        const randomPassword = faker.internet.password();

        const response = await apiContext.post('/login', {
            data: {
                username: randomUsername,
                password: randomPassword
            }
        });

        // Assert that the response status is 401 Unauthorized
        expect(response.status()).toBe(401);

        // We also want to check the response body for the error message - this is optional
        const body = await response.json();
        expect(body.error).toBe('Invalid credentials');
    });

});