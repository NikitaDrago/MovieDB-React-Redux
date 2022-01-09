export const getFilmList = async (page, apiKey) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${page}`);
  return res.json();
};

export const getFilmData = async (id, apiKey) => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
  return res.json();
};