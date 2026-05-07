import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';
import { login } from '../../clients/authClient';
import { createPost, deletePost, updatePost } from '../../clients/postsClient';
import { faker } from '@faker-js/faker';

//API -> UI E2E Test
test.describe('API to UI E2E Tests', () => {

  test('Full flow: API Create -> UI Check -> API Update -> UI Check -> API Delete -> UI Check', async ({ page, request }) => {
    const apiContext = await createApiContext();

    let token: string;
    let postId: string | number;
    let title: string;
    let updatedTitle: string;

    // RESET STATE
    await test.step('Reset backend', async () => {
      await request.post('http://localhost:3001/reset');
    });

    // 1. API Login
    await test.step('API Login', async () => {
       token = await login(apiContext, 'testlll', '123');
       //expect(token).toBeTruthy();
    });

    // 2. Create a post via API with random title and content
    await test.step('API Create Post', async () => {
      title = faker.lorem.words(3);
      const content = faker.lorem.sentence();

      const { data: post, status: createStatus } = await createPost(apiContext, token, title, content);
      postId = post.id;
      expect(createStatus).toBe(201);
      expect(post).toMatchObject({ title, content });
    });
    // 3. Inject token into browser and open UI
    await test.step('Open UI with Token', async () => {
      await page.addInitScript(({ token, postId }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('testPostId', postId.toString());
      }, { token, postId });

      await page.goto('http://localhost:3001');
    });

    // 4. Verify the new post appears in the UI
    await test.step('Verify Post appears in UI', async () => {
      await expect(page.locator(`[data-id="${postId}"]`)).toBeVisible();
      await expect(page.locator(`[data-id="${postId}"]`)).toContainText(title);
    });

    // 5. Update post via API
    await test.step('API Update Post', async () => {
      updatedTitle = 'UPDATED ' + faker.lorem.words(2);
      const { data: updatedPost, status: updateStatus } = await updatePost(apiContext, token, postId, updatedTitle);
      expect(updateStatus).toBe(200);
      expect(updatedPost).toMatchObject({ id: postId, title: updatedTitle });
    });

    // 6. Verify the updated post appears in the UI and wait 5 sec for the update to reflect
    await test.step('Verify Updated Post in UI', async () => {
      await expect(page.locator(`[data-id="${postId}"]`)).toContainText(updatedTitle, { timeout: 5000 });
    });

    // 7. Screenshot at the end of the flow
    await test.step('Take Screenshot', async () => {
      await page.screenshot({ path: `../../docs/images/playwright_e2e_post.png`, fullPage: true });
    });

    // 8. Delete post via API
    await test.step('API Delete Post', async () => {
      const { status: deleteStatus } = await deletePost(apiContext, token, postId);
      expect(deleteStatus).toBe(204);
    });

    // 9. Verify the post disappears from the UI
    await test.step('Verify Post Deleted from UI', async () => {
      await expect(page.locator(`[data-id="${postId}"]`)).toHaveCount(0, { timeout: 25000 });
    });

  });

});