import { useDispatch, useSelector } from "react-redux";
import { apiKeySelector } from "../../../store/selectors";
import { useCallback, useEffect, useState } from "react";
import { getFilmData, getFilmList } from "../../../utils";
import { useHistory, useParams } from "react-router-dom";
import { SET_FILM } from "../../../constants/actions";

const useFilmInfo = () => {
  const {page, id} = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const apiKey = useSelector(apiKeySelector);
  const [data, setData] = useState(null);
  const currentPage = +page?.slice(5) || 1;
  const background = {
    backgroundImage:
      data &&
      `url("https://image.tmdb.org/t/p/original/${data?.backdrop_path}")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const fetchFilmData = useCallback(() => {
    getFilmData(id, apiKey).then(response => setData(response));
  }, [id]);

  const fetchFilm = useCallback(() => {
    getFilmList(currentPage, apiKey).then(response =>
      dispatch({type: SET_FILM, payload: response})
    );
  }, [dispatch, currentPage]);

  const handleAddToFavorite = useCallback(() => {
      const storage = localStorage.getItem("favorite");

      if (storage && storage.split(",").includes(id)) {
        alert("This movies is already on the favorites list");
      } else {
        storage
          ? localStorage.setItem("favorite", `${storage},${id}`)
          : localStorage.setItem("favorite", id);
      }
    },
    [id]
  );

  const handleNextMovie = useCallback(async () => {
    let nextPage = currentPage;
    let filmsList = await getFilmList(nextPage, apiKey);
    const currentIndex = filmsList.results.findIndex(item => item.id === +id);

    if (currentIndex === filmsList.results.length - 1) {
      nextPage += 1;
      filmsList = await getFilmList(nextPage, apiKey);
    }

    history.push(
      `/page-${nextPage}/${
        filmsList.results[
          currentIndex === filmsList.results.length - 1 ? 0 : currentIndex + 1
          ].id
      }`
    );
  }, [history, dispatch, currentPage, page, id]);

  useEffect(() => {
    fetchFilmData();
  }, [fetchFilmData, id]);

  useEffect(() => {
    fetchFilm();
  }, [fetchFilm]);

  return {
    page,
    data,
    background,
    handleAddToFavorite,
    handleNextMovie,
  };
};

export default useFilmInfo;
