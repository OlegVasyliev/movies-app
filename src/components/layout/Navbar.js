import { Link } from "react-router-dom";
import "./layout.css";
import NavbarLinks from "./layoutSubComponents/NavbarLinks";
import NavbarAuth from "./layoutSubComponents/NavbarAuth";
import { useHistory } from "react-router";

const Navbar = () => {
  const history = useHistory();

  const keyPressed = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      history.push(`/find?name=${e.target.value}`);
    }
  };
  return (
    <>
      <header className="bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-stretch justify-content-center justify-content-lg-start">
            <Link to="/" className="navbar-brand logo py-3">
              MOVIES APP
            </Link>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center align-items-center mb-md-0 ms-lg-4">
              <NavbarLinks />
            </ul>

            <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 d-flex align-items-center">
              <input
                type="search"
                className="form-control form-control-dark"
                placeholder="Search..."
                aria-label="Search"
                onKeyUp={keyPressed}
                id="navbar-search"
              />
            </div>
            <NavbarAuth />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
