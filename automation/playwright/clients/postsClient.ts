import { APIRequestContext, expect } from '@playwright/test';

export type Post = {
  id: number;
  title: string;
  content: string;
}

export async function createPost(apiContext: APIRequestContext, token: string) {
  const response = await apiContext.post('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      title: 'Test Post',
      content: 'Playwright API test'
    }
  });

  expect(response.status()).toBe(201);
  return await response.json();
}

export async function getPosts(apiContext: APIRequestContext, token: string): Promise<Post[]> {
  const response = await apiContext.get('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function updatePost(apiContext: APIRequestContext, token: string, id: number) {
  const response = await apiContext.put(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      title: 'Updated Title'
    }
  });

  expect(response.ok()).toBeTruthy();
  return await response.json();
}

export async function deletePost(apiContext: APIRequestContext, token: string, id: number) {
  const response = await apiContext.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  expect(response.status()).toBe(204);
}