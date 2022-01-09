import FilmList from "../Releases/FilmList";
import { Route, Switch } from "react-router-dom";
import FilmInfo from "../Releases/FilmInfo/FilmInfo";
import Favorite from "../Favorite/Favorite";

const Cabinet = () =>
  <Switch>
    <Route exact path="/favorite" component={Favorite}/>
    <Route exact path="/:page/:id" component={FilmInfo}/>
    <Route exact path="/:page?" component={FilmList}/>
  </Switch>;

export default Cabinet;