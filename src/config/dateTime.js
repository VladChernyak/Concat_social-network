export const getLastMessageTimeString = (time) => {
  const date = new Date(time);
  const timeAgo = Date.now() - time;
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  if (timeAgo < 60000) return 'Только что';
  else if (timeAgo < 3600000) return Math.round(timeAgo / 60000) + ' мин.';
  else if (timeAgo < 86400000) return Math.round(timeAgo / 3600000) + ' час';
  else return date.getDate() + ' ' + months[date.getMonth()];
};

export const getMessageTimeString = (time) => {
  const timeObject = new Date(time);
  const shortDate = createShortDate(time);
  const hoursMinutes =
    getValueWithZero(timeObject.getHours()) + ':' + getValueWithZero(timeObject.getMinutes());

  if (shortDate !== createShortDate(Date.now())) {
    return shortDate + ' ' + hoursMinutes;
  } else {
    return hoursMinutes;
  }
};

const getValueWithZero = (num) => (num < 10 ? '0' + num : num);

const createShortDate = (time) => {
  const date = new Date(time);
  let day = getValueWithZero(date.getDate());
  let month = getValueWithZero(date.getMonth());
  let year = date.getFullYear().toString();

  year = year.substring(year.length - 2);

  return day + '.' + month + '.' + year;
};
