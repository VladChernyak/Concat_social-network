import { CHANGE_NAVIGATION_STATE } from './types';

export const setNavigationState = (isOpen) => ({
  type: CHANGE_NAVIGATION_STATE,
  payload: isOpen,
});
