import { Form, Col } from "react-bootstrap";

const SelectRuntime = () => {
	return (
		<Form.Group claas={Col}>
			<Form.Label>Show runtime</Form.Label>
			<Form.Select name="runtime">
				<option value=""></option>
				<option value="30">30 minutes or less</option>
				<option value="60">30 to 60 minutes</option>
				<option value="90">Over 60 minutes</option>
			</Form.Select>
		</Form.Group>
	);
};

export default SelectRuntime;
