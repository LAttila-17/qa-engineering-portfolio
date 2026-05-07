import { test, expect, request } from '@playwright/test';
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

    const { data: post, status: createStatus } = await createPost(apiContext, token, title, content);
    expect(createStatus).toBe(201);
    expect(post.title).toBe(title);
    expect(post.content).toBe(content);

    // 3. Get
    const { data: posts, status: getStatus } = await getPosts(apiContext, token);
    expect(getStatus).toBe(200);
    expect(posts.some((p: any) => p.id === post.id)).toBeTruthy();

    // 4. Update - with another random title
    const updatedTitle = faker.lorem.words(2);

    const { data: updated, status: updateStatus } = await updatePost(apiContext, token, post.id, updatedTitle);
    expect(updateStatus).toBe(200);
    expect(updated.title).toBe(updatedTitle);

    // 5. Delete
    const { status: deleteStatus } = await deletePost(apiContext, token, post.id);
    expect(deleteStatus).toBe(204);

    // 6. Verify delete
    const { data: postsAfterDelete, status: deleteVerifyStatus } = await getPosts(apiContext, token);
    expect(deleteVerifyStatus).toBe(200);
    expect(postsAfterDelete.some(p => p.id === post.id)).toBeFalsy();
  });

});