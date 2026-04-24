import { APIRequestContext, expect } from '@playwright/test';

export async function login(apiContext: APIRequestContext, username: string, password: string): Promise<string> {
  const response = await apiContext.post('/login', {
    data: {
      username,
      password
    }
  });

  const body = await response.json();
  return body.token;
}