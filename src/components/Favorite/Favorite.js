import { useCallback, useEffect, useState } from "react";
import { getFilmData } from "../../utils";
import { useSelector } from "react-redux";
import { apiKeySelector } from "../../store/selectors";
import FavoriteItem from "./FavoriteItem";
import "./Favorite.css";

const Favorite = () => {
  const apiKey = useSelector(apiKeySelector);
  const [favoriteList, setFavoriteList] = useState([]);
  const fetchFilmData = useCallback(() => {
    const getStorage = localStorage.getItem('favorite');

    const requests = getStorage && getStorage.split(',').map(
      id => getFilmData(id, apiKey)
        .then(response => response)
    );

    Promise.all(requests).then(response => setFavoriteList(response));

  }, [setFavoriteList]);

  const handleUnfavoriteFilm = useCallback((id) => {
    const getStorage = localStorage.getItem('favorite');
    const newList = getStorage.split(',').filter(item => +item !== id);
    localStorage.setItem('favorite', newList.join(','));
    fetchFilmData();
  }, [fetchFilmData]);


  useEffect(() => {
    fetchFilmData();
  }, [fetchFilmData]);

  return <main className="FavoriteItem-wrapper">
    <h1 className="FavoriteItem__title">My Favorite</h1>
    {
      favoriteList && favoriteList.map(
        (item, _, arr) => {
          // console.log(arr);
          return <FavoriteItem key={item.id} id={item.id} poster={item.poster_path} title={item.original_title}
                               overview={item.overview} onUnfavoriteFilm={handleUnfavoriteFilm}/>;
        }
      )
    }
  </main>;
};

export default Favorite;