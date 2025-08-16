import './util/handleError';
import './util/setupServiceWorker';
import './global/init';

import TeactDOM from './lib/teact/teact-dom';
import {
  getActions, getGlobal,
} from './global';

import {
  DEBUG, STRICTERDOM_ENABLED,
} from './config';
import { enableStrict, requestMutation } from './lib/fasterdom/fasterdom';
import { selectTabState } from './global/selectors';
import { selectSharedSettings } from './global/selectors/sharedState';
import { betterView } from './util/betterView';
import { requestGlobal, subscribeToMultitabBroadcastChannel } from './util/browser/multitab';
import { establishMultitabRole, subscribeToMasterChange } from './util/establishMultitabRole';
import { initGlobal } from './util/init';
import { initLocalization } from './util/localization';
import { MULTITAB_STORAGE_KEY } from './util/multiaccount';
import { checkAndAssignPermanentWebVersion } from './util/permanentWebVersion';
import { onBeforeUnload } from './util/schedulers';
import updateWebmanifest from './util/updateWebmanifest';

import App from './components/App';

import './assets/fonts/roboto.css';
import './styles/index.scss';

// Import mock API test function for debugging
import { testMockApi } from './api/mock/testMockApi';

if (STRICTERDOM_ENABLED) {
  enableStrict();
}

init();

async function init() {
  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('>>> INIT');
  }

  if (!(window as any).isCompatTestPassed) return;

  checkAndAssignPermanentWebVersion();

  await window.electron?.restoreLocalStorage();

  subscribeToMultitabBroadcastChannel();
  await requestGlobal(APP_VERSION);
  localStorage.setItem(MULTITAB_STORAGE_KEY, '1');
  onBeforeUnload(() => {
    const global = getGlobal();
    if (Object.keys(global.byTabId).length === 1) {
      localStorage.removeItem(MULTITAB_STORAGE_KEY);
    }
  });

  await initGlobal();
  getActions().init();

  getActions().updateShouldEnableDebugLog();
  getActions().updateShouldDebugExportedSenders();

  const global = getGlobal();

  initLocalization(selectSharedSettings(global).language, true);

  subscribeToMasterChange((isMasterTab) => {
    getActions()
      .switchMultitabRole({ isMasterTab }, { forceSyncOnIOs: true });
  });
  const shouldReestablishMasterToSelf = getGlobal().authState !== 'authorizationStateReady';
  establishMultitabRole(shouldReestablishMasterToSelf);

  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('>>> START INITIAL RENDER');
  }

  requestMutation(() => {
    updateWebmanifest();

    TeactDOM.render(
      <App />,
      document.getElementById('root')!,
    );

    betterView();
  });

  if (DEBUG) {
    // eslint-disable-next-line no-console
    console.log('>>> FINISH INITIAL RENDER');
  }

  if (DEBUG) {
    document.addEventListener('dblclick', () => {
      // eslint-disable-next-line no-console
      console.warn('TAB STATE', selectTabState(getGlobal()));
      // eslint-disable-next-line no-console
      console.warn('GLOBAL STATE', getGlobal());
    });
  }

  // Test mock API functionality after API is initialized
  if (DEBUG) {
    setTimeout(() => {
      testMockApi().then(() => {
        console.log('Mock API test completed successfully!');
      }).catch((error) => {
        console.error('Mock API test failed:', error);
      });
    }, 2000); // Wait for API to be fully initialized
  }
}

onBeforeUnload(() => {
  const actions = getActions();
  actions.leaveGroupCall?.({ isPageUnload: true });
  actions.hangUp?.({ isPageUnload: true });
});
