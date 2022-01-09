import { useCallback } from "react";
import { useHistory } from "react-router-dom"

const Film = ({film, page, poster, title}) => {
  const history = useHistory();

  const handleFilmClick = useCallback(() => {
    history.push(`page-${page}/${film.id}`);
  }, [history, page, film]);

  return <img
    onClick={handleFilmClick}
    className="releases__item"
    src={poster && `http://image.tmdb.org/t/p/w342${poster}`}
    alt={poster ? title : 'Изображение не найдено'}
  />;
};

export default Film;