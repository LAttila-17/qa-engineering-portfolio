import { APIRequestContext } from '@playwright/test';

export type Post = {
  id: string | number;
  title: string;
  content: string;
}

export type ApiResponse<T> = {
  data: T;
  status: number;
}

export async function createPost(apiContext: APIRequestContext, token: string, title: string, content: string): Promise<ApiResponse<Post>> {
  const response = await apiContext.post('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      title,
      content
    }
  });

  const post = await response.json();
  return { data: post, status: response.status() };
}

export async function getPosts(apiContext: APIRequestContext, token: string): Promise<ApiResponse<Post[]>> {
  const response = await apiContext.get('/posts', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const posts = await response.json();
  return { data: posts, status: response.status() };
}

export async function updatePost(apiContext: APIRequestContext, token: string, id: string | number, title: string): Promise<ApiResponse<Post>> {
  const response = await apiContext.put(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: {
      title
    }
  });

  const updatedPost = await response.json();
  return { data: updatedPost, status: response.status() };
}

export async function deletePost(apiContext: APIRequestContext, token: string, id: string | number): Promise<ApiResponse<null>> {
  const response = await apiContext.delete(`/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return { data: null, status: response.status() };
}