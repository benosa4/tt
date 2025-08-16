declare const console: any;
import { callApi, mockAuth } from './index';

describe('Mock API', () => {
  test('fetchChats returns data', async () => {
    const chats = await callApi('fetchChats', 20);
    expect(chats).toBeDefined();
  });

  test('provideAuthPhoneNumber updates mock phone', async () => {
    await callApi('provideAuthPhoneNumber', '1234567890');
    expect(mockAuth.getMockPhoneNumber()).toBe('1234567890');
  });
});
