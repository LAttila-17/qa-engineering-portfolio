import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';
import { login } from '../../clients/authClient';
import { createPost, getPosts, updatePost, deletePost } from '../../clients/postsClient';
import { faker } from '@faker-js/faker';

test.describe('Posts API', () => {

  test('Full post lifecycle', async () => {
    const apiContext = await createApiContext();

    // 1. Login
    const token = await login(apiContext, 'testlll', '123');

    // 2. Create - with random title and content
    const title = faker.lorem.words(3);
    const content = faker.lorem.sentence();

    const post = await createPost(apiContext, token, title, content);
    expect(post.title).toBe(title);
    expect(post.content).toBe(content);

    // 3. Get
    const posts = await getPosts(apiContext, token);
    expect(posts.some((p: any) => p.id === post.id)).toBeTruthy();

    // 4. Update - with another random title
    const updatedTitle = faker.lorem.words(2);

    const updated = await updatePost(apiContext, token, post.id, updatedTitle);
    expect(updated.title).toBe(updatedTitle);

    // 5. Delete
    await deletePost(apiContext, token, post.id);

    // 6. Verify delete
    const postsAfterDelete = await getPosts(apiContext, token);
    expect(postsAfterDelete.some(p => p.id === post.id)).toBeFalsy();
  });

});