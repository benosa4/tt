import type { ApiInitialArgs, ApiOnProgress } from '../types/misc';
import type { OnApiUpdate } from '../types/updates';
import * as mockAuth from './auth';
import * as mockChats from './chats';
import * as mockMessages from './messages';
import { DEFAULT_LIMITS, STARS_CURRENCY_CODE, TON_CURRENCY_CODE } from '../../config';

// Re-export all types for compatibility
export * from '../types';

// Mock types for compatibility
export type LocalDb = {
  chats: Record<string, any>;
  users: Record<string, any>;
  documents: Record<string, any>;
  stickerSets: Record<string, any>;
  photos: Record<string, any>;
  webDocuments: Record<string, any>;
  commonBoxState: Record<string, any>;
  channelPtsById: Record<string, any>;
};

export type MethodArgs<T extends keyof Methods> = any[];
export type Methods = Record<string, (...args: any[]) => any>;

// Mock API implementation
class MockApi {
  private updateCallback?: OnApiUpdate;
  private isInitialized = false;

  async init(onUpdate: OnApiUpdate, initialArgs: ApiInitialArgs): Promise<void> {
    this.updateCallback = onUpdate;
    this.isInitialized = true;
    
    // Simulate successful initialization
    setTimeout(() => {
      this.updateCallback?.({
        '@type': 'updateConnectionState',
        connectionState: 'connectionStateReady',
      });

      this.updateCallback?.({
        '@type': 'updateApiReady',
      });

      this.updateCallback?.({
        '@type': 'updateAuthorizationState',
        authorizationState: mockAuth.getCurrentAuthState(),
      });
    }, 1000);
  }

  async callApi<T>(method: string, ...args: any[]): Promise<T> {
    // For mock mode, always allow API calls even if not explicitly initialized
    if (!this.isInitialized) {
      // Auto-initialize for mock mode
      this.isInitialized = true;
      console.log('Mock API auto-initialized for method:', method);
    }

    // Mock responses for different API methods
    switch (method) {
      case 'fetchChats':
        return mockChats.mockFetchChats(args[0], args[1], args[2]) as T;
      case 'fetchChat':
        return mockChats.mockFetchChat(args[0]) as T;
      case 'createChat':
        return mockChats.mockCreateChat(args[0], args[1]) as T;
      case 'updateChatTitle':
        return mockChats.mockUpdateChatTitle(args[0], args[1]) as T;
      case 'toggleChatPinned':
        return mockChats.mockToggleChatPinned(args[0]) as T;
      case 'toggleChatArchived':
        return mockChats.mockToggleChatArchived(args[0]) as T;
      
      case 'fetchMessages':
        return mockMessages.mockFetchMessages(args[0], args[1], args[2]) as T;
      case 'sendMessage':
        return mockMessages.mockSendMessage(args[0], args[1]) as T;
      case 'editMessage':
        return mockMessages.mockEditMessage(args[0], args[1]) as T;
      case 'deleteMessage':
        return mockMessages.mockDeleteMessage(args[0]) as T;
      case 'forwardMessages':
        return mockMessages.mockForwardMessages(args[0], args[1], args[2]) as T;
      case 'searchMessages':
        return mockMessages.mockSearchMessages(args[0], args[1]) as T;
      
      case 'provideAuthPhoneNumber':
      case 'signIn':
        return mockAuth.mockSignIn(args[0], this.updateCallback!) as T;
      case 'provideAuthCode':
      case 'submitCode':
        return mockAuth.mockSubmitCode(args[0], this.updateCallback!) as T;
      case 'signUp':
        return mockAuth.mockSignUp(args[0], args[1], this.updateCallback!) as T;
      case 'provideAuthPassword':
      case 'signInWithPassword':
        return mockAuth.mockSignInWithPassword(args[0], this.updateCallback!) as T;
      
      case 'downloadMedia':
        return this.mockDownloadMedia(args) as T;
      case 'fetchUser':
        return this.mockFetchUser(args) as T;
      
      // Add missing API methods that are being called
      case 'fetchLanguage':
        return this.mockFetchLanguage(args) as T;
      case 'fetchLangDifference':
        return this.mockFetchLangDifference(args) as T;
      case 'oldFetchLangPack':
        return this.mockOldFetchLangPack(args) as T;
      case 'fetchLangPack':
        return this.mockFetchLangPack(args) as T;
      case 'fetchLangStrings':
        return this.mockFetchLangStrings(args) as T;
      case 'fetchNearestCountry':
        return this.mockFetchNearestCountry(args) as T;
      case 'fetchCountryList':
        return this.mockFetchCountryList(args) as T;
      case 'fetchCustomEmoji':
        return [] as T;
      case 'fetchChatFolders':
        return {} as T;
      case 'fetchRecommendedChatFolders':
        return {} as T;
      case 'fetchConfig':
        return this.mockFetchConfig() as T;
      case 'fetchAppConfig':
        return this.mockFetchAppConfig() as T;
      case 'fetchSavedChats':
        return mockChats.mockFetchChats(args[0]?.limit, args[0]?.offsetDate, args[0]?.offsetId) as T;
      case 'fetchAllStories':
        return this.mockFetchAllStories() as T;
      case 'fetchContentSettings':
        return this.mockFetchContentSettings() as T;
      case 'fetchPeerColors':
        return this.mockFetchPeerColors() as T;
      case 'fetchStickerSets':
        return this.mockFetchStickerSets() as T;
      case 'fetchCustomEmojiSets':
        return this.mockFetchCustomEmojiSets() as T;
      case 'fetchContactList':
        return this.mockFetchContactList() as T;
      case 'fetchCurrentUser':
        return this.mockFetchCurrentUser() as T;
      case 'fetchAuthorizations':
        return this.mockFetchAuthorizations() as T;
      case 'fetchStarsStatus':
        return this.mockFetchStarsStatus(args[0]) as T;
      case 'fetchStarsTopupOptions':
        return [] as T;
      case 'fetchCollectibleEmojiStatuses':
        return this.mockFetchCollectibleEmojiStatuses() as T;
      case 'fetchAnimatedEmojis':
        return [] as T;
      case 'fetchAnimatedEmojiEffects':
        return [] as T;
      case 'fetchFeaturedEmojiStickers':
        return this.mockFetchFeaturedEmojiStickers() as T;
      case 'updateIsOnline':
        return { success: true } as T;

      default:
        return this.mockGenericResponse(method, args) as T;
    }
  }

  private mockDownloadMedia(args: any[]) {
    return Promise.resolve({
      dataBlob: new Blob(['mock media data'], { type: 'image/jpeg' }),
      mimeType: 'image/jpeg',
    });
  }

  private mockFetchUser(args: any[]) {
    return Promise.resolve({
      id: 'user1',
      firstName: 'Mock',
      lastName: 'User',
      username: 'mockuser',
      phoneNumber: '+1234567890',
    });
  }

  private mockFetchLanguage(args: any[]) {
    return Promise.resolve({
      language: {
        langCode: 'en',
        name: 'English',
        nativeName: 'English',
        pluralCode: 'en',
        strings: {
          'AuthTitle': 'Sign in to Telegram',
          'CountryNone': 'Unknown',
          'LoginNext': 'Next',
          'AuthPhoneNumber': 'Phone Number',
          'AuthContinueOnThisLanguage': 'Continue in this language',
          'LoginSelectCountryTitle': 'Country',
        },
        version: 1,
      },
    });
  }

  private mockFetchLangDifference(args: any[]) {
    return Promise.resolve({
      langPack: {
        langCode: 'en',
        name: 'English',
        nativeName: 'English',
        pluralCode: 'en',
        strings: {
          'AuthTitle': 'Sign in to Telegram',
          'CountryNone': 'Unknown',
          'LoginNext': 'Next',
          'AuthPhoneNumber': 'Phone Number',
          'AuthContinueOnThisLanguage': 'Continue in this language',
          'LoginSelectCountryTitle': 'Country',
        },
        version: 1,
      },
    });
  }

  private mockOldFetchLangPack(args: any[]) {
    return Promise.resolve({
      langPack: {
        langCode: 'en',
        name: 'English',
        nativeName: 'English',
        pluralCode: 'en',
        strings: {
          'AuthTitle': 'Sign in to Telegram',
          'CountryNone': 'Unknown',
          'LoginNext': 'Next',
          'AuthPhoneNumber': 'Phone Number',
          'AuthContinueOnThisLanguage': 'Continue in this language',
          'LoginSelectCountryTitle': 'Country',
        },
        version: 1,
      },
    });
  }

  private mockFetchLangPack(args: any[]) {
    return Promise.resolve({
      version: 1,
      strings: {
        'AuthTitle': 'Sign in to Telegram',
        'CountryNone': 'Unknown',
        'LoginNext': 'Next',
        'AuthPhoneNumber': 'Phone Number',
        'AuthContinueOnThisLanguage': 'Continue in this language',
        'LoginSelectCountryTitle': 'Country',
      },
    });
  }

  private mockFetchLangStrings(args: any[]) {
    const params = args[0] || {};
    const { keys } = params;

    const allStrings: Record<string, string> = {
      AuthTitle: 'Sign in to Telegram',
      CountryNone: 'Unknown',
      LoginNext: 'Next',
      AuthPhoneNumber: 'Phone Number',
      AuthContinueOnThisLanguage: 'Continue in this language',
      LoginSelectCountryTitle: 'Country',
    };

    const strings: Record<string, string> = {};
    if (Array.isArray(keys)) {
      keys.forEach((key: string) => {
        if (allStrings[key]) {
          strings[key] = allStrings[key];
        }
      });
    }

    return Promise.resolve({ strings });
  }

  private mockFetchNearestCountry(args: any[]) {
    return Promise.resolve('US');
  }

  private mockFetchCountryList(args: any[]) {
    const phoneCodes = [
      {
        iso2: 'US',
        name: 'United States',
        defaultName: 'United States',
        countryCode: '1',
      },
      {
        iso2: 'RU',
        name: 'Russia',
        defaultName: 'Россия',
        countryCode: '7',
      },
      {
        iso2: 'GB',
        name: 'United Kingdom',
        defaultName: 'United Kingdom',
        countryCode: '44',
      },
    ];

    const general = phoneCodes.map(({ iso2, name, defaultName }) => ({
      iso2,
      name,
      defaultName,
    }));

    return Promise.resolve({ phoneCodes, general });
  }

  private mockFetchConfig() {
    return Promise.resolve({
      expiresAt: Math.floor(Date.now() / 1000) + 3600,
      limits: DEFAULT_LIMITS,
    });
  }

  private mockFetchAppConfig() {
    return Promise.resolve({
      hash: '0',
      limits: DEFAULT_LIMITS,
    });
  }

  private mockFetchAllStories() {
    return Promise.resolve({ state: '0', peerStories: [], stealthMode: {}, hasMore: false });
  }

  private mockFetchContentSettings() {
    return Promise.resolve({ isSensitiveEnabled: false });
  }

  private mockFetchPeerColors() {
    return Promise.resolve({ colors: {}, hash: '0' });
  }

  private mockFetchStickerSets() {
    return Promise.resolve({ hash: '0', sets: [] });
  }

  private mockFetchCustomEmojiSets() {
    return Promise.resolve({ hash: '0', sets: [] });
  }

  private mockFetchContactList() {
    return Promise.resolve({ users: [], userStatusesById: {} });
  }

  private mockFetchCurrentUser() {
    return Promise.resolve({
      user: {
        id: 'currentUser',
        firstName: 'Mock',
        lastName: 'User',
        username: 'mockuser',
        phoneNumber: mockAuth.getMockPhoneNumber(),
        isSelf: true,
      },
      userFullInfo: {},
    });
  }

  private mockFetchAuthorizations() {
    return Promise.resolve({ authorizations: {}, ttlDays: 30 });
  }

  private mockFetchStarsStatus(args: any[]) {
    const isTon = args && args[0] && args[0].isTon;
    return Promise.resolve({
      balance: { amount: 0, currency: isTon ? TON_CURRENCY_CODE : STARS_CURRENCY_CODE },
      history: [],
    });
  }

  private mockFetchCollectibleEmojiStatuses() {
    return Promise.resolve({ hash: '0', statuses: [] });
  }

  private mockFetchFeaturedEmojiStickers() {
    return Promise.resolve({ sets: [] });
  }

  private mockGenericResponse(method: string, args: any[]) {
    console.log(`Mock API call: ${method}`, args);
    return Promise.resolve({ success: true, method });
  }

  cancelApiProgress(progressCallback: ApiOnProgress): void {
    if (progressCallback.isCanceled !== undefined) {
      progressCallback.isCanceled = true;
    }
  }
}

// Create singleton instance
const mockApi = new MockApi();

// Export functions that match the original GramJS API
export const initApi = (onUpdate: OnApiUpdate, initialArgs: ApiInitialArgs) => 
  mockApi.init(onUpdate, initialArgs);

export const callApi = <T>(method: string, ...args: any[]): Promise<T> => 
  mockApi.callApi(method, ...args);

export const cancelApiProgress = (progressCallback: ApiOnProgress) => 
  mockApi.cancelApiProgress(progressCallback);

// Mock additional functions
export const callApiLocal = callApi;
export const cancelApiProgressMaster = cancelApiProgress;
export const handleMethodCallback = () => {};
export const handleMethodResponse = () => {};
export const updateFullLocalDb = () => {};
export const updateLocalDb = () => {};
export const setShouldEnableDebugLog = () => {};

// Export mock modules for testing
export { mockAuth, mockChats, mockMessages };
