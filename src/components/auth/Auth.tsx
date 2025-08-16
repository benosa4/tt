import '../../global/actions/initial';

import type { FC } from '../../lib/teact/teact';
import { memo, useRef } from '../../lib/teact/teact';
import { getActions, withGlobal } from '../../global';

import type { GlobalState } from '../../global/types';

import { PLATFORM_ENV } from '../../util/browser/windowEnvironment';

import useCurrentOrPrev from '../../hooks/useCurrentOrPrev';
import useElectronDrag from '../../hooks/useElectronDrag';
import useHistoryBack from '../../hooks/useHistoryBack';

import Transition from '../ui/Transition';
import AuthCode from './AuthCode.async';
import AuthPassword from './AuthPassword.async';
import AuthPhoneNumber from './AuthPhoneNumber';
import AuthRegister from './AuthRegister.async';

import './Auth.scss';

type StateProps = Pick<GlobalState, 'authState'>;

const Auth: FC<StateProps> = ({
  authState,
}) => {
  const containerRef = useRef<HTMLDivElement>();
  useElectronDrag(containerRef);

  // For animation purposes
  const renderingAuthState = useCurrentOrPrev(
    authState !== 'authorizationStateReady' ? authState : undefined,
    true,
  );

  function getScreen() {
    switch (renderingAuthState) {
      case 'authorizationStateWaitCode':
        return <AuthCode />;
      case 'authorizationStateWaitPassword':
        return <AuthPassword />;
      case 'authorizationStateWaitRegistration':
        return <AuthRegister />;
      case 'authorizationStateWaitPhoneNumber':
        return <AuthPhoneNumber />;
      default:
        return <AuthPhoneNumber />;
    }
  }

  function getActiveKey() {
    switch (renderingAuthState) {
      case 'authorizationStateWaitCode':
        return 0;
      case 'authorizationStateWaitPassword':
        return 1;
      case 'authorizationStateWaitRegistration':
        return 2;
      case 'authorizationStateWaitPhoneNumber':
        return 3;
      default:
        return 3;
    }
  }

  return (
    <Transition activeKey={getActiveKey()} name="fade" className="Auth" ref={containerRef}>
      {getScreen()}
    </Transition>
  );
};

export default memo(withGlobal(
  (global): StateProps => {
    return {
      authState: global.authState,
    };
  },
)(Auth));
