import { Form, Col } from "react-bootstrap";

const SelectStatus = () => {
	return (
		<Form.Group as={Col}>
			<Form.Label>Show status</Form.Label>
			<Form.Select name="status">
				<option value=""></option>
				<option value="Running">Running</option>
				<option value="Ended">Ended</option>
				<option value="To Be Determined">To Be Determined</option>
				<option value="In Development">In Development</option>
			</Form.Select>
		</Form.Group>
	);
};

export default SelectStatus;
