import "./FilmInfo.css";
import useFilmInfo from "./useFilmInfo";
import { useHistory } from "react-router-dom";

const FilmInfo = () => {
  const history = useHistory();
  const {page, data, background, handleAddToFavorite, handleNextMovie} = useFilmInfo();
  
  return (
    <div style={background}>
      <div className="filmInfo_blur">
        <div className="button-wrapper">
          <button
            className="movieDB__button"
            onClick={() => history.push(`/${page}`)}
          >
            &#8592; Back to list
          </button>
          <button className="movieDB__button" onClick={handleNextMovie}>
            Next Movie &#8594;
          </button>
        </div>
        <div className="filmInfo-wrapper">
          <img
            className="releases__item"
            src={data && `http://image.tmdb.org/t/p/w342${data?.poster_path}`}
            alt={data?.poster_path ? data.title : "Изображение не найдено"}
          />
          <div className="filmInfo-header">
            <div className="filmInfo-buttonWrapper">
              <button className="movieDB__button" onClick={handleAddToFavorite}>
                Add to Favorite
              </button>
            </div>
            <h1 className="filmInfo__title">{data?.title}</h1>
            <ul className="filmInfo-info">
              <li className="cell">{`Score: ${data?.vote_average}`}</li>
              <li className="cell">{`Duration: ${data?.runtime}m`}</li>
              <li className="cell">{`Release Data: ${data?.release_date}`}</li>
            </ul>
            <p className="filmInfo__overview">{data?.overview || "No Info"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfo;
