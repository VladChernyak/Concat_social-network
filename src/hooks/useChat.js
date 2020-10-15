import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { CHAT } from '../constants/pathnames';
import { createNewDialog } from '../containers/Chat/actions';
import { selectChat } from '../containers/Chat/selectors';

const useChat = () => {
  const dispatch = useDispatch();

  const { dialogs, dialogsLoading, error } = useSelector(selectChat);
  const { id: partnerId } = useParams();
  const { pathname } = useLocation();

  const currentDialog = dialogs.find(({ id }) => id === partnerId);

  const [chatOpened, setChatOpened] = useState(false);
  const openChat = () => setChatOpened(true);
  const closeChat = () => setChatOpened(false);

  useEffect(() => {
    if (pathname === CHAT) {
      setChatOpened(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (partnerId && !dialogsLoading) {
      currentDialog || dispatch(createNewDialog(partnerId));
    }
  }, [partnerId, dialogsLoading, dispatch, currentDialog]);

  return {
    dialogs,
    dialogsLoading,
    currentDialog,
    chatOpened,
    openChat,
    closeChat,
    partnerId,
    error,
  };
};

export default useChat;
