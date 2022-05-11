import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <div className="header">
      <Link to={"/"} className="link">
        Home
      </Link>
      <Link to={"/skills"} className="link">
        skills
      </Link>
      <Link to={"/static"} className="link">
        static
      </Link>
      <button onClick={props.changeTheme}>{props.themeName}</button>
    </div>
  );
};

export default Header;
