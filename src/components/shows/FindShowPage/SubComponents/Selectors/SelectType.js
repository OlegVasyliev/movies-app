import { Form, Col } from "react-bootstrap";

const SelectType = () => {
	return (
		<Form.Group as={Col}>
			<Form.Label>Show type</Form.Label>
			<Form.Select name="type">
				<option value=""></option>
				<option value="Scripted">Scripted</option>
				<option value="Animation">Animation</option>
				<option value="Reality">Reality</option>
				<option value="Talk Show">Talk Show</option>
				<option value="Documentary">Documentary</option>
				<option value="Game Show">Game Show</option>
				<option value="News">News</option>
				<option value="Sports">Sports</option>
				<option value="Variety">Variety</option>
				<option value="Award Show">Award Show</option>
				<option value="Panel Show">Panel Show</option>
			</Form.Select>
		</Form.Group>
	);
};

export default SelectType;
