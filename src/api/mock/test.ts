// Test file for mock API
import { callApi, initApi } from './index';

// Test function
export async function testMockApi() {
  console.log('Testing Mock API...');
  
  try {
    // Test fetchChats
    const chats = await callApi('fetchChats', 20);
    console.log('Chats:', chats);
    
    // Test fetchMessages
    const messages = await callApi('fetchMessages', '1', 10);
    console.log('Messages:', messages);
    
    // Test sendMessage
    const sentMessage = await callApi('sendMessage', '1', 'Test message');
    console.log('Sent message:', sentMessage);
    
    console.log('Mock API test completed successfully!');
  } catch (error) {
    console.error('Mock API test failed:', error);
  }
}

// Export for testing
export default testMockApi;


