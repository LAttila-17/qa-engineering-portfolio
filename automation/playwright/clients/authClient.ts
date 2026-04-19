import { APIRequestContext, expect } from '@playwright/test';

//await login(apiContext, 'wronguser', 'wrongpass');
export async function login(apiContext: APIRequestContext, username: string, password: string): Promise<string> {
  const response = await apiContext.post('/login', {
    data: {
      username,
      password
    }
  });

  //expect(response.status()).toBe(200);

  const body = await response.json();
  return body.token;
}