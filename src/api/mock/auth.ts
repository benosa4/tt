import type { OnApiUpdate } from '../../types';

// Mock authentication state
let currentAuthState = 'authorizationStateWaitPhoneNumber';
let mockPhoneNumber = '';
let mockCode = '';

export function mockSetAuthState(state: string) {
  currentAuthState = state;
}

export function mockSetPhoneNumber(phone: string) {
  mockPhoneNumber = phone;
}

export function mockSetCode(code: string) {
  mockCode = code;
}

// Mock authentication methods
export async function mockSignIn(phoneNumber: string, onUpdate: OnApiUpdate): Promise<void> {
  mockSetPhoneNumber(phoneNumber);
  
  // Simulate phone number validation
  if (phoneNumber.length < 10) {
    onUpdate({
      '@type': 'updateAuthorizationError',
      error: {
        message: 'Invalid phone number',
        isSlowMode: false,
        hasErrorKey: true,
      },
    });
    return;
  }

  // Simulate successful phone number submission
  setTimeout(() => {
    onUpdate({
      '@type': 'updateAuthorizationState',
      authorizationState: 'authorizationStateWaitCode',
      isCodeViaApp: false,
    });
  }, 1000);
}

export async function mockSubmitCode(code: string, onUpdate: OnApiUpdate): Promise<void> {
  mockSetCode(code);

  // Always simulate successful authentication for any code
  setTimeout(() => {
    onUpdate({
      '@type': 'updateAuthorizationState',
      authorizationState: 'authorizationStateReady',
    });

    onUpdate({
      '@type': 'updateCurrentUser',
      user: {
        id: 'currentUser',
        firstName: 'Mock',
        lastName: 'User',
        username: 'mockuser',
        phoneNumber: mockPhoneNumber,
        isPremium: false,
      },
    });
  }, 1000);
}

export async function mockSignUp(firstName: string, lastName: string, onUpdate: OnApiUpdate): Promise<void> {
  // Simulate registration
  setTimeout(() => {
    onUpdate({
      '@type': 'updateAuthorizationState',
      authorizationState: 'authorizationStateReady',
    });
    
    onUpdate({
      '@type': 'updateCurrentUser',
      user: {
        id: 'currentUser',
        firstName,
        lastName,
        username: 'newuser',
        phoneNumber: mockPhoneNumber,
        isPremium: false,
      },
    });
  }, 1000);
}

export async function mockSignInWithPassword(password: string, onUpdate: OnApiUpdate): Promise<void> {
  // Simulate 2FA authentication
  if (password !== 'password123') {
    onUpdate({
      '@type': 'updateAuthorizationError',
      error: {
        message: 'Invalid password',
        isSlowMode: false,
        hasErrorKey: true,
      },
    });
    return;
  }

  setTimeout(() => {
    onUpdate({
      '@type': 'updateAuthorizationState',
      authorizationState: 'authorizationStateReady',
    });
  }, 1000);
}

export function getCurrentAuthState(): string {
  return currentAuthState;
}

export function getMockPhoneNumber(): string {
  return mockPhoneNumber;
}

export function getMockCode(): string {
  return mockCode;
}



