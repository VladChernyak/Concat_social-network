export const selectNewMessages = ({ chat: { dialogs } }) =>
  dialogs.reduce((sum, data) => (sum += data.newMessages ? data.newMessages : 0), 0);

export const selectChat = ({ chat }) => chat;
export const selectDialogs = ({ chat }) => chat.dialogs;
