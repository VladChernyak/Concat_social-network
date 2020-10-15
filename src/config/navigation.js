export const getNavigationDotPosition = (activeElement) => {
  const top = activeElement.offsetTop;
  const height = activeElement.getBoundingClientRect().height;

  return top - height / 2;
};
