import { useState } from "react";
import { Form } from "react-bootstrap";
import { useUser } from "../../../contexts/UserContext";
import { useGetAsyncData } from "../../hooks/useGetAsyncData";
import UserCard from "../../utilities/Cards/UserCard";

const AllUsersPage = () => {
	const [allUsers, setAllUsers] = useState();
	const [query, setQuery] = useState("");
	const { getAllUsersWithoutSelf } = useUser();

	useGetAsyncData(getAllUsersWithoutSelf, setAllUsers);

	return (
		<div className="container">
			<h2 className="mt-3">All other users</h2>
			<Form.Control
				type="text"
				placeholder="Firs name or last name"
				onChange={(e) => setQuery(e.target.value)}
			/>
			<div className="row">
				{allUsers &&
					allUsers
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
						))}
			</div>
		</div>
	);
};

export default AllUsersPage;
