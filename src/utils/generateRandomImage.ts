const generateRandomImage = async () => {
  const randomPage = Math.floor(Math.random() * (10 - 1 + 1) + 1);
  const randomImage = Math.floor(Math.random() * (100 - 1 + 1) + 1);
  const imageData = await (
    await fetch(`https://picsum.photos/v2/list?page=${randomPage}&limit=100`)
  ).json();

  const randomImageID = imageData[randomImage].download_url.split("/")[4];
  const randomImageURL = `https://picsum.photos/id/${randomImageID}/700`;
  return randomImageURL;
};

export default generateRandomImage;
