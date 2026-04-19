import { test, expect } from '@playwright/test';
import { createApiContext } from '../../utils/apiContext';
import { login } from '../../clients/authClient';
import { createPost, getPosts, updatePost, deletePost } from '../../clients/postsClient';

test.describe('Posts API', () => {

  test('Full post lifecycle', async () => {
    const apiContext = await createApiContext();

    // 1. Login
    const token = await login(apiContext, 'testlll', '123');

    // 2. Create
    const post = await createPost(apiContext, token);
    expect(post.title).toBe('Test Post');

    // 3. Get
    const posts = await getPosts(apiContext, token);
    expect(posts.some(p => p.id === post.id)).toBeTruthy();

    // 4. Update
    const updated = await updatePost(apiContext, token, post.id);
    expect(updated.title).toBe('Updated Title');

    // 5. Delete
    await deletePost(apiContext, token, post.id);

    // 6. Verify delete
    const postsAfterDelete = await getPosts(apiContext, token);
    expect(postsAfterDelete.some(p => p.id === post.id)).toBeFalsy();
  });

});