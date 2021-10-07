import { Link } from "react-router-dom";

const UserNotAuthorized = () => {
	return (
		<div className="text-end d-flex align-items-center">
			<Link to="/sign-in" className="btn btn-outline-light me-2">
				Sign In
			</Link>
			<Link to="/sign-up" className="btn btn-warning">
				Sign Up
			</Link>
		</div>
	);
};

export default UserNotAuthorized;
