import { Form, Col } from "react-bootstrap";

const SelectGenre = () => {
	return (
		<Form.Group as={Col}>
			<Form.Label>Show genre</Form.Label>
			<Form.Select name="genre">
				<option value=""></option>
				<option value="Action">Action</option>
				<option value="Adult">Adult</option>
				<option value="Adventure">Adventure</option>
				<option value="Anime">Anime</option>
				<option value="Children">Children</option>
				<option value="Comedy">Comedy</option>
				<option value="Crime">Crime</option>
				<option value="DIY">DIY</option>
				<option value="Drama">Drama</option>
				<option value="Espionage">Espionage</option>
				<option value="Family">Family</option>
				<option value="Fantasy">Fantasy</option>
				<option value="Food">Food</option>
				<option value="History">History</option>
				<option value="Horror">Horror</option>
				<option value="Legal">Legal</option>
				<option value="Medical">Medical</option>
				<option value="Music">Music</option>
				<option value="Mystery">Mystery</option>
				<option value="Nature">Nature</option>
				<option value="Romance">Romance</option>
				<option value="Science-Fiction">Science-Fiction</option>
				<option value="Sports">Sports</option>
				<option value="Supernatural">Supernatural</option>
				<option value="Thriller">Thriller</option>
				<option value="Travel">Travel</option>
				<option value="War">War</option>
				<option value="Western">Western</option>
			</Form.Select>
		</Form.Group>
	);
};

export default SelectGenre;
