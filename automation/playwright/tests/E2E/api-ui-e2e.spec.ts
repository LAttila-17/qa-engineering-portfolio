import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';
import { login } from '../../clients/authClient';
import { createPost, deletePost } from '../../clients/postsClient';
import { faker } from '@faker-js/faker';

//API -> UI E2E Test
test.describe('API to UI E2E Tests', () => {

    test('Create a post via API and verify it appears in the UI', async ({ page }) => {
        const apiContext = await createApiContext();

        // 1. API Login
        const token = await login(apiContext, 'testlll', '123');

        // 2. Create a post via API with random title and content
        const title = faker.lorem.words(3);
        const content = faker.lorem.sentence();

        const post = await createPost(apiContext, token, title, content);

        let postId = post.id;

        try {
        // 3. Inject token into browser
        await page.addInitScript((token) => {
            window.localStorage.setItem('token', token);
        }, token);

        // 4. Open UI (mock frontend)
        await page.goto('http://localhost:3001');

        // 5. Verify the new post appears in the UI
        const postLocator = page.locator(`li[data-id="${postId}"]`);

        await expect(postLocator).toBeVisible();
        await expect(postLocator).toHaveText(title);

        } finally {
            // Cleanup: Delete the post via API
            await deletePost(apiContext, token, postId);
        }

    });

});