import type { OnApiUpdate } from '../types/updates';

// Mock message data
const mockMessages = [
  {
    id: 1,
    text: 'Mock message 1',
    date: Date.now(),
    senderId: 'user1',
    chatId: '1',
    isOutgoing: false,
    isRead: true,
    isEdited: false
  },
  {
    id: 2,
    text: 'Mock message 2',
    date: Date.now() - 60000,
    senderId: 'user2',
    chatId: '1',
    isOutgoing: false,
    isRead: true,
    isEdited: false
  },
  {
    id: 3,
    text: 'Hello from current user',
    date: Date.now() - 120000,
    senderId: 'currentUser',
    chatId: '1',
    isOutgoing: true,
    isRead: true,
    isEdited: true
  },
];

export async function mockFetchMessages(chatId: string, limit: number = 20, offsetId?: number) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const chatMessages = mockMessages.filter(msg => msg.chatId === chatId);
  const messages = offsetId 
    ? chatMessages.filter(msg => msg.id < offsetId).slice(0, limit)
    : chatMessages.slice(0, limit);
  
  return {
    messages,
    users: [
      {
        id: 'user1',
        firstName: 'Mock',
        lastName: 'User 1',
      },
      {
        id: 'user2',
        firstName: 'Mock',
        lastName: 'User 2',
      },
    ],
    chats: [],
    count: chatMessages.length,
  };
}

export async function mockSendMessage(chatId: string, text: string) {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newMessage = {
    id: Date.now(),
    text,
    date: Date.now(),
    senderId: 'currentUser',
    chatId,
    isOutgoing: true,
    isRead: false,
    isEdited: false
  };
  
  mockMessages.unshift(newMessage);
  
  return newMessage;
}

export async function mockEditMessage(messageId: number, text: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const message = mockMessages.find(msg => msg.id === messageId);
  if (message) {
    message.text = text;
    message.isEdited = true;
  }
  
  return { success: true };
}

export async function mockDeleteMessage(messageId: number) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const index = mockMessages.findIndex(msg => msg.id === messageId);
  if (index !== -1) {
    mockMessages.splice(index, 1);
  }
  
  return { success: true };
}

export async function mockForwardMessages(messageIds: number[], fromChatId: string, toChatId: string) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const messagesToForward = mockMessages.filter(msg => 
    messageIds.includes(msg.id) && msg.chatId === fromChatId
  );
  
  const forwardedMessages = messagesToForward.map(msg => ({
    ...msg,
    id: Date.now() + Math.random(),
    chatId: toChatId,
    isForwarded: true,
    forwardFrom: {
      chatId: fromChatId,
      messageId: msg.id,
    },
  }));
  
  mockMessages.push(...forwardedMessages);
  
  return {
    messages: forwardedMessages,
  };
}

export async function mockSearchMessages(chatId: string, query: string) {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const chatMessages = mockMessages.filter(msg => msg.chatId === chatId);
  const results = chatMessages.filter(msg => 
    msg.text.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    messages: results,
    totalCount: results.length,
  };
}

export function getMockMessages() {
  return mockMessages;
}



