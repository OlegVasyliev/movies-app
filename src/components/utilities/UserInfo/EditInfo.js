import { Button, Form } from "react-bootstrap";
import { useUser } from "../../../contexts/UserContext";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useState } from "react";

const EditInfo = ({ closer }) => {
	const { currentUserInfo, updateUserInfo, currentUser } = useUser();
	const [userGenres, setUserGenres] = useState(currentUserInfo.favGenres);

	const genresOptions = [
		"Thriller",
		"Travel",
		"War",
		"Western",
		"Mystery",
		"Nature",
		"Romance",
		"Science-Fiction",
		"Sports",
		"Supernatural",
		"Food",
		"History",
		"Horror",
		"Legal",
		"Medical",
		"Music",
		"Crime",
		"DIY",
		"Drama",
		"Espionage",
		"Family",
		"Fantasy",
		"Action",
		"Adult",
		"Adventure",
		"Anime",
		"Children",
		"Comedy",
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		try {
			await updateUserInfo(currentUser.uid, {
				favGenres: userGenres,
				about: formDataObj.about,
				firstname: formDataObj.firstname,
				lastname: formDataObj.lastname,
			});
			closer();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="col-sm-12 col-md-9 px-4 mt-2">
			<Form onSubmit={handleSubmit}>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label className="h5">First name:</Form.Label>
					<Form.Control
						type="text"
						name="firstname"
						defaultValue={currentUserInfo.firstname}
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label className="h5">Last name:</Form.Label>
					<Form.Control
						type="text"
						name="lastname"
						defaultValue={currentUserInfo.lastname}
					/>
				</Form.Group>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlTextarea1"
				>
					<Form.Label className="h5">About yourself:</Form.Label>
					<Form.Control
						name="about"
						as="textarea"
						rows={5}
						defaultValue={currentUserInfo.about}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="my_multiselect_field">
					<Form.Label>My multiselect</Form.Label>
					<DropdownMultiselect
						selected={userGenres}
						options={genresOptions}
						name="countries"
						handleOnChange={(selected) => setUserGenres(selected)}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Save changes
				</Button>
				<Button className="ms-3" variant="secondary" onClick={closer}>
					Cancel
				</Button>
			</Form>
		</div>
	);
};

export default EditInfo;
