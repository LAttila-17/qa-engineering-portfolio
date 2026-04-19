import { request, APIRequestContext } from '@playwright/test';

export async function createApiContext(): Promise<APIRequestContext> {
  return await request.newContext({
    baseURL: 'http://localhost:3001',
    extraHTTPHeaders: {
      'Content-Type': 'application/json'
    }
  });
}