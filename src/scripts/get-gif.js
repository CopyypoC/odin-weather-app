const GIPHY_API_KEY = "no7wHXrEXsgBmDumUyeuT4u0T8RNiqse";

export async function getGifUrl(condition) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_API_KEY}&s=${condition}`,
    );
    const json = await response.json();
    return json.data.images.original.url;
  } catch (err) {
    console.log(err);
  }
}
