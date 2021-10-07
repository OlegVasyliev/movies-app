import "../../users/users.css";

const UserInfo = ({ userInfo }) => {
	return (
		<div className="col-sm-12 col-md-9 px-4 mt-2">
			<h2 className="h2">
				{userInfo.firstname + " " + userInfo.lastname}
			</h2>
			<h5 className="h5 text-muted ms-3">{userInfo.email}</h5>
			<div className="bg-light mt-4 p-3">
				<h5 className="h5">About yourself:</h5>
				<p className="multiline-article">
					{userInfo.about || "Write something about yourself ;)"}
				</p>
			</div>
			<p className="h5 mt-4">
				<strong>Favourite genres:</strong>{" "}
				{userInfo.favGenres.join(", ")}
			</p>
		</div>
	);
};

export default UserInfo;
