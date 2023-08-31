const generateRandomImage = async () => {
  const randomPage = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  const randomImage = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  const data = await (
    await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
  ).json();
  return data[randomImage];
};

export default generateRandomImage;
