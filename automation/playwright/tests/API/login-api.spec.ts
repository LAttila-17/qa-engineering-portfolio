import { test, expect, request } from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';
import { login } from '../../clients/authClient';

test.describe('Login API Tests', () => {

    test('Successful login', async () => {
        const apiContext = await createApiContext();
        const token = await login(apiContext, 'testlll', '123');
        expect(token).toBeTruthy();
    });

    test('Failed login with wrong credentials', async () => {
        const apiContext = await createApiContext();
        try {
            await login(apiContext, 'wronguser', 'wrongpass');
        } catch (error) {
            expect(error.response.status()).toBe(401);
        }
    });

});