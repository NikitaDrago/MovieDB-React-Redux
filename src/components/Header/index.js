import "./Header.css";
import { NavLink, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const onChange = (e) => {
    if (e.target.value === 'Favorite') {
      history.push('/favorite');
    } else {
      history.push('/');
    }
  };

  return (
    <header className="header">
      <span className="header__title">Movies</span>
      <select className="header__dropmenu" id="" onClick={onChange}>
        <option className="dropmenu__item" value="Account">
          My Account
        </option>
        <option className="dropmenu__item" value="Favorite">
          My Favorite
        </option>
      </select>
    </header>
  );
};

export default Header;
