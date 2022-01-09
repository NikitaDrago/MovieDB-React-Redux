import { useDispatch, useSelector } from "react-redux";
import { apiKeySelector } from "../../store/selectors";
import { useCallback, useEffect, useState } from "react";
import { getFilmData, getFilmList } from "../../utils";
import './FilmInfo.css';
import { useHistory, useParams } from "react-router-dom";
import { SET_FILM } from "../../constants/actions";

const FilmInfo = () => {
  const {page, id} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const apiKey = useSelector(apiKeySelector);
  const [data, setData] = useState(null);
  const currentPage = +page?.slice(5) || 1;
  const background = {
    backgroundImage: data && `url("https://image.tmdb.org/t/p/original/${data?.backdrop_path}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  const fetchFilmData = useCallback(() => {
    getFilmData(id, apiKey).then(response => setData(response));
  }, [id]);

  const fetchFilm = useCallback(() => {
    getFilmList(currentPage, apiKey).then(response => dispatch({type: SET_FILM, payload: response}));
  }, [dispatch, currentPage]);

  const handleAddToFavorite = useCallback((e) => {
    const storage = localStorage.getItem('favorite');
    if ([...storage.split(',')].includes(id)) {
      alert('This movies is already on the favorites list');
    } else {
      storage ? localStorage.setItem('favorite', [storage, id]) : localStorage.setItem('favorite', id);
    }
  }, [id]);

  const handleNextMovie = useCallback(async () => {
    let nextPage = currentPage;
    let filmsList = await getFilmList(nextPage, apiKey);
    const currentIndex = filmsList.results.findIndex(item => item.id === +id);

    if (currentIndex === filmsList.results.length - 1) {
      nextPage += 1;
      dispatch({type: SET_CURRENT_PAGE, payload: nextPage});
      filmsList = await getFilmList(nextPage, apiKey);
    }

    history.push(`/page-${nextPage}/${filmsList.results[currentIndex === filmsList.results.length - 1 ? 0 : currentIndex + 1].id}`);
  }, [history, dispatch, currentPage, page, id]);

  useEffect(() => {
    fetchFilmData();
  }, [fetchFilmData, id]);

  useEffect(() => {
    fetchFilm();
  }, [fetchFilm]);

  return <div style={background}>
    <div className="filmInfo_blur">
      <div className="button-wrapper">
        <button className="movieDB__button" onClick={
          () => history.push(`/${page}`)
        }>&#8592; Back to list
        </button>
        <button className="movieDB__button" onClick={handleNextMovie}>Next Movie &#8594;</button>
      </div>
      <div className="filmInfo-wrapper">
        <img
          className="releases__item"
          src={data && `http://image.tmdb.org/t/p/w342${data?.poster_path}`}
          alt={data?.poster_path ? data.title : 'Изображение не найдено'}
        />
        <div className="filmInfo-header">
          <div className="filmInfo-buttonWrapper">
            <button className="movieDB__button" onClick={handleAddToFavorite}>Add to Favorite</button>
          </div>
          <h1 className="filmInfo__title">{data?.title}</h1>
          <ul className="filmInfo-info">
            <li className="cell">{`Score: ${data?.vote_average}`}</li>
            <li className="cell">{`Duration: ${data?.runtime}m`}</li>
            <li className="cell">{`Release Data: ${data?.release_date}`}</li>
          </ul>
          <p className="filmInfo__overview">{data?.overview || 'No Info'}</p>
        </div>
      </div>
    </div>
  </div>;
};

export default FilmInfo;