import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router";
import { useRef, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { Alert } from "react-bootstrap";
import "./auth.css";

const SignUp = () => {
	const [validInfo, setValidInfo] = useState({
		pass: false,
		repeatPass: false,
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const { signup } = useUser();

	const email = useRef();
	const firstname = useRef();
	const lastname = useRef();
	const userPass = useRef();
	const repeatPass = useRef();

	const errorList = useRef();
	const repeatPassError = useRef();

	const validatePassword = () => {
		const passStr = userPass.current.value;
		let errorMessageList = [];

		if (!/(?=.*\d)/.test(passStr)) {
			errorMessageList.push("Must contain number\n");
		}
		if (!/(?=.*[a-z])/.test(passStr)) {
			errorMessageList.push("Must contain lowercase letter\n");
		}
		// if (!/(?=.*[A-Z])/.test(pass)) {
		// 	errorMessageList.push("Must contain uppercase letter\n");
		// }
		// if (!/(?=.*[-+_!@#$%^&*.,?])/.test(pass)) {
		// 	errorMessageList.push("Must contain symbol\n");
		// }
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

	const handleRegistration = async (e) => {
		e.preventDefault();

		validatePassword();
		validateRepeatPassword();

		if (validInfo.pass && validInfo.repeatPass) {
			try {
				setError("");
				setLoading(true);
				await signup(
					email.current.value,
					userPass.current.value,
					firstname.current.value,
					lastname.current.value
				);
				history.push("/");
			} catch (e) {
				console.log(e);
				setError("Failed to sign up");
			}
		}
	};

	return (
		<main className="form-signin text-center">
			<form onSubmit={handleRegistration}>
				<h1 className="h3 mt-5 mb-3 fw-normal">Sign up</h1>
				{error && <Alert variant="danger">{error}</Alert>}
				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="userEmail"
						placeholder="name@example.com"
						required
						ref={email}
					/>
					<label htmlFor="userEmail">Email address</label>
				</div>

				<div className="form-floating mt-1">
					<input
						type="text"
						className="form-control"
						id="userFirstname"
						placeholder="First Name"
						required
						ref={firstname}
					/>
					<label htmlFor="userFirstname">First Name</label>
				</div>

				<div className="form-floating mt-1">
					<input
						type="text"
						className="form-control"
						id="userLastname"
						placeholder="Last Name"
						required
						ref={lastname}
					/>
					<label htmlFor="userLastname">Last Name</label>
				</div>

				<div className="form-floating mt-3 d-flex field-with-popover">
					<input
						type="password"
						className="form-control"
						id="userPassword"
						placeholder="Password"
						onBlur={validatePassword}
						ref={userPass}
						required
					/>
					<label htmlFor="userPassword">Password</label>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						fill="currentColor"
						className="bi bi-info-circle-fill"
						viewBox="0 0 16 16"
						data-tip
						data-for="tooltip"
					>
						<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
					</svg>
					<ReactTooltip
						id="tooltip"
						place="bottom"
						type="dark"
						effect="solid"
					>
						<ul className="text-start">
							<li>Be at least 8 characters</li>
							<li>Have at least one number</li>
							<li>Have at least one lower case letter</li>
						</ul>
					</ReactTooltip>
				</div>
				<ul
					className="text-danger text-start visually-hidden mt-1"
					ref={errorList}
				></ul>

				<div className="form-floating mt-1">
					<input
						type="password"
						className="form-control"
						id="repeatUserPassword"
						placeholder="Password"
						onChange={validateRepeatPassword}
						required
						ref={repeatPass}
					/>
					<label htmlFor="repeatUserPassword">Repeat password</label>
				</div>
				<ul
					className="text-danger text-start visually-hidden"
					ref={repeatPassError}
				>
					<li>Passwords must be the same</li>
				</ul>

				<button
					className="w-100 btn btn-lg btn-primary mt-4"
					type="submit"
					disabled={
						loading || !validInfo.pass || !validInfo.repeatPass
					}
				>
					Sign up
				</button>
			</form>
		</main>
	);
};

export default SignUp;
