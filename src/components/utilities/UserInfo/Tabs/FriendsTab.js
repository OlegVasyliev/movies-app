import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useUser } from "../../../../contexts/UserContext";
import UserCard from "../../Cards/UserCard";

const FriendsTab = ({ friendsUIDs }) => {
	const [loading, setLoading] = useState(true);
	const [friends, setFriends] = useState([]);
	const [query, setQuery] = useState("");
	const { getUserInfo } = useUser();

	const loadFriends = () => {
		setFriends([]);
		friendsUIDs.forEach(async (friendUID) => {
			const friend = await getUserInfo(friendUID);
			setFriends((prevValue) => [
				...prevValue,
				{ uid: friendUID, userInfo: friend },
			]);
		});
	};

	useEffect(() => {
		loadFriends();
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [friends]);

	return (
		<div
			className="tab-pane"
			id="friends"
			role="tabpanel"
			aria-labelledby="friends-tab"
		>
			<Form.Control
				className="mt-2"
				type="text"
				placeholder="Friends first name and last name"
				onChange={(e) => setQuery(e.target.value)}
			/>
			{!loading && (
				<div className="container">
					<div className="row">
						{friends.length !== 0 ? (
							friends
								.filter((user) => {
									if (query !== "") {
										return (
											user.userInfo.firstname +
											" " +
											user.userInfo.lastname
										)
											.toLocaleLowerCase()
											.includes(query);
									}
									return true;
								})
								.map((user) => (
									<UserCard key={`${user.uid}`} user={user} />
								))
						) : (
							<p className="text-muted mt-2">No friends yet</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default FriendsTab;
