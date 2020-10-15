import store from '../store';

export const processUserData = (userData) => {
  const state = store.getState().profile;

  Object.entries(state).forEach(([name, value]) => {
    if (!userData[name]) {
      userData[name] =
        typeof value === 'object' && value !== null
          ? {}
          : typeof value === 'boolean' && value
          ? true
          : null;
    }
  });

  return userData;
};

export const compressImage = (target, width, handler) => {
  const reader = new FileReader();
  const file = target.files[0];

  try {
    reader.readAsDataURL(file);

    reader.onload = (e) => {
      const image = new Image();

      image.src = e.target.result;
      image.onload = () => {
        let canvasWidth = image.width;
        let canvasHeight = image.height;

        if (image.width > width) {
          const scaleFactor = width / image.width;
          canvasWidth = width;
          canvasHeight = image.height * scaleFactor;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
        canvas.toBlob(
          (blob) => {
            const fileData = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });

            handler(fileData);
          },
          file.type,
          0.7,
        );
      };
    };
  } catch (e) {
    console.log(e);
  }
};

export const toShortenText = (text, width) =>
  text.length > width ? text.substring(0, width - 3) + '...' : text;
