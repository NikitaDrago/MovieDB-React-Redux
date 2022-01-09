export const getFilms = async (url) => {
  const res = await fetch(url);
  return res.json();
};