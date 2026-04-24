import { APIRequestContext, expect } from '@playwright/test';

export type Post = {
  id: number;
  title: string;
  content: string;
}

export async function createPost(apiContext: APIRequestContext, token: string, title: string, content: string): Promise<Post> {
  const response = await apiContext.post('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      title,
      content
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

export async function updatePost(apiContext: APIRequestContext, token: string, id: number, title: string): Promise<Post> {
  const response = await apiContext.put(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      title
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

  // For delete, we expect a 204 No Content status
  expect(response.status()).toBe(204);
}