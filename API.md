# Telegram T API Documentation

## Overview
This document describes all API endpoints used in the Telegram T application. The API is designed to handle various Telegram functionality including authentication, messaging, file management, and more.

## Authentication Endpoints

### User Authentication
- `init` - Initialize API connection and authentication
- `signIn` - Sign in with phone number and code
- `signUp` - Register new user account
- `signInWithPassword` - Sign in with 2FA password
- `signInWithQrCode` - Sign in using QR code (mobile app)
- `exportLoginToken` - Export login token for QR authentication
- `importLoginToken` - Import login token from QR scan
- `checkPassword` - Verify 2FA password
- `resetPassword` - Reset 2FA password
- `requestPasswordRecovery` - Request password recovery
- `recoverPassword` - Recover password with code

### Session Management
- `destroy` - Destroy current session
- `logout` - Logout user
- `getSessionData` - Get current session data
- `setSessionData` - Set session data

## Chat Management

### Chat Operations
- `fetchChats` - Fetch list of chats
- `fetchSavedChats` - Fetch saved messages
- `fetchChat` - Fetch specific chat details
- `createChat` - Create new chat
- `deleteChat` - Delete chat
- `leaveChat` - Leave chat
- `joinChat` - Join chat via invite link
- `getChatInviteLink` - Get chat invite link
- `revokeChatInviteLink` - Revoke chat invite link
- `exportChatInviteLink` - Export chat invite link
- `checkChatInvite` - Check chat invite validity
- `joinChatByInvite` - Join chat using invite link

### Chat Settings
- `updateChatTitle` - Update chat title
- `updateChatAbout` - Update chat description
- `updateChatPhoto` - Update chat photo
- `deleteChatPhoto` - Delete chat photo
- `toggleChatPinned` - Pin/unpin chat
- `toggleChatArchived` - Archive/unarchive chat
- `toggleChatIsProtected` - Enable/disable chat protection
- `toggleChatIsBlocked` - Block/unblock chat
- `toggleChatIsVerified` - Verify/unverify chat
- `toggleChatIsScam` - Mark/unmark chat as scam
- `toggleChatIsFake` - Mark/unmark chat as fake

### Chat Members
- `fetchChatMembers` - Fetch chat members
- `addChatMember` - Add member to chat
- `deleteChatMember` - Remove member from chat
- `updateChatMemberRights` - Update member permissions
- `banChatMember` - Ban chat member
- `unbanChatMember` - Unban chat member
- `getChatMember` - Get specific member info

## Message Management

### Message Operations
- `fetchMessages` - Fetch messages from chat
- `fetchMessage` - Fetch specific message
- `sendMessage` - Send new message
- `editMessage` - Edit existing message
- `deleteMessage` - Delete message
- `deleteMessages` - Delete multiple messages
- `forwardMessages` - Forward messages to other chat
- `pinMessage` - Pin message in chat
- `unpinMessage` - Unpin message
- `getMessageReactions` - Get message reactions
- `sendMessageReaction` - React to message
- `getMessageReactionsList` - Get list of users who reacted

### Message Search
- `searchMessagesInChat` - Search messages within chat
- `searchMessagesGlobal` - Global message search
- `searchMessagesByDate` - Search messages by date range

## User Management

### User Operations
- `fetchUser` - Fetch user information
- `updateUser` - Update user profile
- `updateUserPhoto` - Update user avatar
- `deleteUserPhoto` - Delete user avatar
- `blockUser` - Block user
- `unblockUser` - Unblock user
- `getUserStatus` - Get user online status
- `getUserFullInfo` - Get detailed user information

## File and Media Management

### Media Operations
- `downloadMedia` - Download media file
- `uploadMedia` - Upload media file
- `getMediaThumb` - Get media thumbnail
- `getMediaInfo` - Get media metadata
- `compressMedia` - Compress media file
- `convertMedia` - Convert media format

### File Operations
- `uploadFile` - Upload file
- `downloadFile` - Download file
- `getFileInfo` - Get file information
- `deleteFile` - Delete file

## Stickers and Emojis

### Sticker Operations
- `fetchStickerSets` - Fetch sticker sets
- `installStickerSet` - Install sticker set
- `uninstallStickerSet` - Uninstall sticker set
- `createStickerSet` - Create custom sticker set
- `addStickerToSet` - Add sticker to set
- `removeStickerFromSet` - Remove sticker from set

### Emoji Operations
- `fetchEmojiKeywords` - Fetch emoji keywords
- `fetchEmojiStickers` - Fetch emoji stickers
- `getEmojiSuggestions` - Get emoji suggestions

## Calls and Voice

### Call Operations
- `startCall` - Start voice/video call
- `acceptCall` - Accept incoming call
- `rejectCall` - Reject incoming call
- `endCall` - End active call
- `getCallState` - Get call status
- `updateCallSettings` - Update call settings

## Payments and Premium

### Payment Operations
- `fetchPaymentForm` - Get payment form
- `validatePaymentForm` - Validate payment data
- `sendPaymentForm` - Submit payment
- `getPaymentReceipt` - Get payment receipt
- `getPaymentStatus` - Check payment status

### Premium Features
- `fetchPremiumFeatures` - Get premium features
- `activatePremium` - Activate premium subscription
- `getPremiumStatus` - Check premium status

## Stars and Monetization

### Stars Operations
- `fetchStarsStatus` - Get stars balance
- `fetchStarsTopupOptions` - Get top-up options
- `fetchStarsTransactions` - Get transaction history
- `sendStars` - Send stars to user
- `getStarsHistory` - Get stars usage history

## Statistics and Analytics

### Chat Statistics
- `fetchChannelStatistics` - Get channel statistics
- `fetchGroupStatistics` - Get group statistics
- `fetchMessageStatistics` - Get message statistics
- `fetchStoryStatistics` - Get story statistics

## Stories

### Story Operations
- `fetchStories` - Fetch user stories
- `sendStory` - Send new story
- `editStory` - Edit story
- `deleteStory` - Delete story
- `getStoryViews` - Get story views
- `getStoryReactions` - Get story reactions

## Settings and Configuration

### App Settings
- `fetchSettings` - Get application settings
- `updateSettings` - Update application settings
- `resetSettings` - Reset to default settings
- `exportSettings` - Export settings
- `importSettings` - Import settings

### Privacy Settings
- `fetchPrivacySettings` - Get privacy settings
- `updatePrivacySettings` - Update privacy settings
- `getPrivacyRules` - Get privacy rules

## Two-Factor Authentication

### 2FA Operations
- `enable2FA` - Enable 2FA
- `disable2FA` - Disable 2FA
- `change2FAPassword` - Change 2FA password
- `get2FAStatus` - Get 2FA status
- `get2FARecoveryCodes` - Get recovery codes

## Bot Operations

### Bot Management
- `fetchBotInfo` - Get bot information
- `startBot` - Start bot
- `stopBot` - Stop bot
- `sendBotCommand` - Send command to bot
- `getBotCommands` - Get available bot commands

## Account Management

### Account Operations
- `fetchAccountInfo` - Get account information
- `updateAccountInfo` - Update account details
- `deleteAccount` - Delete account
- `getAccountSettings` - Get account settings
- `updateAccountSettings` - Update account settings

## Notifications

### Notification Management
- `fetchNotificationSettings` - Get notification settings
- `updateNotificationSettings` - Update notification settings
- `getNotificationExceptions` - Get notification exceptions
- `updateNotificationExceptions` - Update notification exceptions

## Search and Discovery

### Global Search
- `searchGlobal` - Global search across all content
- `searchUsers` - Search for users
- `searchChats` - Search for chats
- `searchMessages` - Search for messages
- `searchFiles` - Search for files

## Updates and Real-time

### Update Handling
- `getDifference` - Get updates since last sync
- `getState` - Get current application state
- `getUpdates` - Get pending updates
- `acknowledgeUpdates` - Mark updates as processed

## Error Handling

### Error Types
- `RPCError` - Remote procedure call errors
- `NetworkError` - Network connection errors
- `AuthError` - Authentication errors
- `ValidationError` - Data validation errors
- `RateLimitError` - Rate limiting errors

## Response Formats

### Standard Response
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: number;
    message: string;
    details?: any;
  };
}
```

### Pagination
```typescript
interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  hasMore: boolean;
  nextOffset?: string | number;
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:
- Authentication: 5 attempts per minute
- Message sending: 30 messages per minute
- File uploads: 10 files per minute
- API calls: 1000 requests per hour

## Authentication Flow

1. **Initialization**: Call `init` with API credentials
2. **Phone Number**: Submit phone number via `signIn`
3. **Verification**: Enter SMS/Telegram code
4. **2FA (Optional)**: Enter password if enabled
5. **Session**: Receive session token for subsequent requests

## WebSocket Events

The API supports real-time updates via WebSocket:
- `message` - New message received
- `chat_update` - Chat information updated
- `user_update` - User status changed
- `typing` - User typing indicator
- `online` - User online status

## Security Considerations

- All API calls use HTTPS
- Authentication tokens are encrypted
- Rate limiting prevents abuse
- Input validation on all endpoints
- CORS protection enabled
- XSS protection implemented



