import { useRef, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useUser } from "../../../contexts/UserContext";
import "../../users/users.css";

const EditCredentials = ({ closer }) => {
	const { currentUser, updateUserPassword, updateUserEmail } = useUser();
	const [validInfo, setValidInfo] = useState({
		pass: true,
		repeatPass: false,
	});
	const [error, setError] = useState("");

	const newPass = useRef();
	const userPass = useRef();
	const repeatPass = useRef();

	const errorList = useRef();
	const repeatPassError = useRef();

	const validateNewPassword = () => {
		const passStr = newPass.current.value;
		let errorMessageList = [];

		if (!/(?=.*\d)/.test(passStr)) {
			errorMessageList.push("Must contain number\n");
		}
		if (!/(?=.*[a-z])/.test(passStr)) {
			errorMessageList.push("Must contain lowercase letter\n");
		}
		if (passStr.length < 8) {
			errorMessageList.push("Must have at least 8 characters\n");
		}

		errorList.current.innerHTML = "";
		if (errorMessageList.length === 0) {
			errorList.current.classList.add("visually-hidden");
		} else {
			for (const errorMessage of errorMessageList) {
				const errorLi = document.createElement("li");
				errorLi.innerText = errorMessage;
				errorList.current.append(errorLi);
			}
			errorList.current.classList.remove("visually-hidden");
		}

		setValidInfo({ ...validInfo, pass: errorMessageList.length === 0 });
	};

	const validateRepeatPassword = () => {
		if (repeatPass.current.value !== userPass.current.value) {
			repeatPassError.current.classList.remove("visually-hidden");
		} else {
			repeatPassError.current.classList.add("visually-hidden");
		}

		setValidInfo({
			...validInfo,
			repeatPass: repeatPass.current.value === userPass.current.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);
		const formDataObj = Object.fromEntries(formData.entries());

		try {
			let passUpdated = false;
			if (formDataObj.newPassword) {
				await updateUserPassword(
					currentUser.email,
					userPass.current.value,
					newPass.current.value
				);
				passUpdated = true;
			}
			await updateUserEmail(
				currentUser.email,
				passUpdated ? newPass.current.value : userPass.current.value,
				formDataObj.email
			);
			closer();
		} catch (error) {
			setError("Failed to update credentials");
			console.log(error);
		}
	};

	return (
		<div className="col-sm-12 col-md-9 px-4 mt-2">
			{error && <Alert variant="danger">{error}</Alert>}
			<Form onSubmit={handleSubmit}>
				<Form.Group
					className="mb-3"
					controlId="exampleForm.ControlInput1"
				>
					<Form.Label className="h5">Email:</Form.Label>
					<Form.Control
						type="email"
						name="email"
						placeholder="Enter email"
						required
						defaultValue={currentUser.email}
					/>
				</Form.Group>
				<Form.Group className="mb-4" controlId="formBasicPassword">
					<Form.Label>New password</Form.Label>
					<Form.Control
						className="hide-text"
						type="text"
						name="newPassword"
						placeholder="Password"
						onBlur={validateNewPassword}
						ref={newPass}
						defaultValue=""
						security="true"
					/>
					<Form.Text className="text-muted">
						Leave this field empty if you don't want to change
						password
					</Form.Text>
				</Form.Group>
				<ul
					className="text-danger text-start visually-hidden mt-1"
					ref={errorList}
				></ul>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						name="password"
						placeholder="Password"
						required
						ref={userPass}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Repeat password</Form.Label>
					<Form.Control
						type="password"
						name="repeatPassword"
						placeholder="Password"
						required
						ref={repeatPass}
						onChange={validateRepeatPassword}
					/>
				</Form.Group>
				<ul
					className="text-danger text-start visually-hidden"
					ref={repeatPassError}
				>
					<li>Passwords must be the same</li>
				</ul>
				<Button
					variant="primary"
					type="submit"
					disabled={!validInfo.pass || !validInfo.repeatPass}
				>
					Save changes
				</Button>
				<Button className="ms-3" variant="secondary" onClick={closer}>
					Cancel
				</Button>
			</Form>
		</div>
	);
};

export default EditCredentials;
