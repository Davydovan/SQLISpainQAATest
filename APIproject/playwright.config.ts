import { defineConfig } from '@playwright/test';
export default defineConfig({
  reporter: 'html',
  use: {    
    baseURL: 'https://petstore.swagger.io/v2/',
    extraHTTPHeaders: {
       "Content-Type": "application/json",
        "accept": "application/json"
    }
  }
});