import { combineReducers } from 'redux';
import authReducer from '../containers/AuthPage/reducer';
import profileReducer from '../containers/UserProfile/reducer';
import otherProfileReducer from '../containers/OtherProfile/reducer';
import socialReducer from '../containers/Social/reducer';
import chatReducer from '../containers/Chat/reducer';
import appPageReducer from '../containers/AppPage/reducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  otherProfile: otherProfileReducer,
  social: socialReducer,
  chat: chatReducer,
  appPage: appPageReducer,
});
