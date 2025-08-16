declare const console: any;
import { callApi } from './index';

describe('Mock API', () => {
  test('fetchChats returns data', async () => {
    const chats = await callApi('fetchChats', 20);
    expect(chats).toBeDefined();
  });
});
