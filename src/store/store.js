import { createStore } from "redux";
import { SET_FILM } from "../constants/actions";

const initState = {
  films: [],
  pagesCount: 0,
  apiKey: 'ebea8cfca72fdff8d2624ad7bbf78e4c',
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FILM:
      return {
        ...state,
        films: action.payload.results,
        pagesCount: action.payload.total_pages,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;

