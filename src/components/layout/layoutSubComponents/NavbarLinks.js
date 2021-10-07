import { NavLink } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import "../layout.css";

const NavbarLinks = () => {
	const { currentUser } = useUser();
	return (
		<>
			<li className="header-link">
				<NavLink
					to="/"
					className="nav-link px-4 text-white d-flex align-items-center"
					aria-current="page"
					id="find-nav"
				>
					Browse
				</NavLink>
			</li>
			<li className="header-link">
			</li>
			<li className="header-link">
				{currentUser && (
					<NavLink
						to="/users"
						className="nav-link px-4 text-white d-flex align-items-center"
						aria-current="page"
						id="users-nav"
					>
						Users
					</NavLink>
				)}
			</li>
		</>
	);
};

export default NavbarLinks;
