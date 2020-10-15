export const createMessage = (text) => {
  const myId = localStorage.getItem('myId');

  return { time: Date.now(), sender: myId, text };
};

export const submitTextarea = (event) => {
  if (event.which === 13 && !event.shiftKey) {
    event.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
    event.preventDefault();
  }
};

export const scrollDialogOnMessage = (ref) => {
  if (!ref) return;
  const coords = ref.scrollHeight - ref.clientHeight;

  ref.scrollTo({
    top: coords,
    behavior: 'smooth',
  });
};
