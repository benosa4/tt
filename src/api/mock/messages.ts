import type { OnApiUpdate } from '../types/updates';
import type { SendMessageParams } from '../../types';
import type { ApiMessage } from '../types/messages';

// Mock message data
const mockMessages: ApiMessage[] = [
  {
    id: 1,
    chatId: '1',
    date: Date.now(),
    senderId: 'user1',
    isOutgoing: false,
    isRead: true,
    isEdited: false,
    content: { text: { text: 'Mock message 1' } },
  },
  {
    id: 2,
    chatId: '1',
    date: Date.now() - 60000,
    senderId: 'user2',
    isOutgoing: false,
    isRead: true,
    isEdited: false,
    content: { text: { text: 'Mock message 2' } },
  },
  {
    id: 3,
    chatId: '1',
    date: Date.now() - 120000,
    senderId: 'currentUser',
    isOutgoing: true,
    isRead: true,
    isEdited: true,
    content: { text: { text: 'Hello from current user' } },
  },
];

export function initMockMessages(updateCallback: OnApiUpdate): void {
  setInterval(() => {
    if (!mockMessages.length) {
      return;
    }
    const message = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    const emojis = ['👍', '❤️', '😂', '🔥'];
    const reaction = emojis[Math.floor(Math.random() * emojis.length)];
    updateCallback({
      '@type': 'updateMessageReactions',
      chatId: message.chatId,
      id: message.id,
      reactions: {
        results: [{ reaction: { emoticon: reaction }, count: 1 }],
      },
    } as any);
  }, 5000);
}

export async function mockFetchMessages(chatId: string, limit: number = 20, offsetId?: number) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const chatMessages = mockMessages.filter((msg) => msg.chatId === chatId);
  const messages = offsetId
    ? chatMessages.filter((msg) => msg.id < offsetId).slice(0, limit)
    : chatMessages.slice(0, limit);

  return {
    messages,
    users: [
      { id: 'user1', firstName: 'Mock', lastName: 'User 1' },
      { id: 'user2', firstName: 'Mock', lastName: 'User 2' },
    ],
    chats: [],
    count: chatMessages.length,
  };
}

export async function mockSendMessage(
  params: SendMessageParams,
  _progress?: any,
  updateCallback?: OnApiUpdate,
) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const { chat, text, attachment } = params;
  const chatId = chat?.id || '1';
  const id = Date.now();

  const content: any = {};
  if (text) {
    content.text = { text };
  }
  if (attachment) {
    if (attachment.mimeType.startsWith('image/')) {
      content.photo = {
        mediaType: 'photo',
        id: String(id),
        date: Date.now(),
        sizes: [],
        blobUrl: attachment.blobUrl,
      };
    } else if (attachment.mimeType.startsWith('video/')) {
      content.video = {
        mediaType: 'video',
        id: String(id),
        mimeType: attachment.mimeType,
        duration: attachment.quick?.duration || 0,
        fileName: attachment.filename,
        width: attachment.quick?.width,
        height: attachment.quick?.height,
        size: attachment.size,
        blobUrl: attachment.blobUrl,
      };
    } else {
      content.document = {
        mediaType: 'document',
        id: String(id),
        mimeType: attachment.mimeType,
        fileName: attachment.filename,
        size: attachment.size,
        blobUrl: attachment.blobUrl,
      };
    }
  }

  const newMessage: ApiMessage = {
    id,
    chatId,
    date: Date.now(),
    senderId: 'currentUser',
    isOutgoing: true,
    isRead: true,
    isEdited: false,
    content,
  };

  mockMessages.unshift(newMessage);
  updateCallback?.({ '@type': 'newMessage', chatId, id, message: newMessage } as any);

  setTimeout(() => {
    const reply: ApiMessage = {
      id: Date.now(),
      chatId,
      date: Date.now(),
      senderId: 'user1',
      isOutgoing: false,
      isRead: true,
      isEdited: false,
      content: { text: { text: 'Auto reply' } },
    };
    mockMessages.unshift(reply);
    updateCallback?.({ '@type': 'newMessage', chatId, id: reply.id, message: reply } as any);
  }, 1000);

  return newMessage;
}

export async function mockEditMessage(messageId: number, text: string) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const message = mockMessages.find((msg) => msg.id === messageId);
  if (message) {
    message.content = { ...message.content, text: { text } };
    message.isEdited = true;
  }

  return { success: true };
}

export async function mockDeleteMessage(messageId: number) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const index = mockMessages.findIndex((msg) => msg.id === messageId);
  if (index !== -1) {
    mockMessages.splice(index, 1);
  }

  return { success: true };
}

export async function mockForwardMessages(messageIds: number[], fromChatId: string, toChatId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const messagesToForward = mockMessages.filter(
    (msg) => messageIds.includes(msg.id) && msg.chatId === fromChatId,
  );

  const forwardedMessages = messagesToForward.map((msg) => ({
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
  await new Promise((resolve) => setTimeout(resolve, 600));

  const chatMessages = mockMessages.filter((msg) => msg.chatId === chatId);
  const results = chatMessages.filter((msg) =>
    msg.content?.text?.text?.toLowerCase().includes(query.toLowerCase()),
  );

  return {
    messages: results,
    totalCount: results.length,
  };
}

export async function mockSearchMessagesGlobal({ query }: { query: string }) {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const results = mockMessages.filter((msg) =>
    msg.content?.text?.text?.toLowerCase().includes(query.toLowerCase()),
  );

  return {
    messages: results,
    totalCount: results.length,
  };
}

export function getMockMessages() {
  return mockMessages;
}
