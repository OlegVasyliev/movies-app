import { Form, Col } from "react-bootstrap";

const SelectSort = () => {
	return (
		<Form.Group as={Col}>
			<Form.Label>Sort by</Form.Label>
			<Form.Select name="sort">
				<option value="Most popular">Most popular</option>
				<option value="Least popular">Least popular</option>
				<option value="Highest rating">Highest rating</option>
				<option value="Lowest rating">Lowest rating</option>
				<option value="A to Z">A to Z</option>
				<option value="Z to A">Z to A</option>
			</Form.Select>
		</Form.Group>
	);
};

export default SelectSort;
