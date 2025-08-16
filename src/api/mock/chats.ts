import type { OnApiUpdate } from '../types/updates';

// Mock chat data
const mockChats = [
  {
    id: '1',
    type: 'chat',
    title: 'Mock Chat 1',
    unreadCount: 5,
    lastMessage: {
      text: 'Hello from mock API',
      date: Date.now(),
    },
    isPinned: false,
    isArchived: false,
  },
  {
    id: '2',
    type: 'channel',
    title: 'Mock Channel',
    unreadCount: 0,
    lastMessage: {
      text: 'Channel message',
      date: Date.now() - 3600000,
    },
    isPinned: true,
    isArchived: false,
  },
];

export async function mockFetchChats(limit: number = 20, offsetDate?: number, offsetId?: number) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    chats: mockChats,
    users: [],
    chatIds: mockChats.map(chat => chat.id),
  };
}

export async function mockFetchChat(chatId: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const chat = mockChats.find(c => c.id === chatId);
  if (!chat) {
    throw new Error('Chat not found');
  }
  
  return {
    chat,
    users: [],
  };
}

export async function mockCreateChat(title: string, userIds: string[]) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newChat = {
    id: Date.now().toString(),
    type: 'chat',
    title,
    unreadCount: 0,
    lastMessage: null,
    isPinned: false,
    isArchived: false,
  };
  
  mockChats.push(newChat);
  
  return {
    chat: newChat,
    users: [],
  };
}

export async function mockUpdateChatTitle(chatId: string, title: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const chat = mockChats.find(c => c.id === chatId);
  if (chat) {
    chat.title = title;
  }
  
  return { success: true };
}

export async function mockToggleChatPinned(chatId: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const chat = mockChats.find(c => c.id === chatId);
  if (chat) {
    chat.isPinned = !chat.isPinned;
  }
  
  return { success: true };
}

export async function mockToggleChatArchived(chatId: string) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const chat = mockChats.find(c => c.id === chatId);
  if (chat) {
    chat.isArchived = !chat.isArchived;
  }
  
  return { success: true };
}

export function getMockChats() {
  return mockChats;
}



