import { callApi } from './index';

export async function testMockApi(): Promise<void> {
  const { chats } = await callApi<{ chats: unknown[] }>('fetchChats', 20);
  if (!Array.isArray(chats)) {
    throw new Error('Mock API fetchChats returned invalid data');
  }
  // eslint-disable-next-line no-console
  console.log(`Fetched ${chats.length} chats from mock API`);
}
