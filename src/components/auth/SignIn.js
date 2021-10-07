import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";
import { useHistory } from "react-router";
import "./auth.css";

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { signin } = useUser();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signin(emailRef.current.value, passwordRef.current.value);
			setLoading(false);
			history.push("/");
		} catch (e) {
			console.log(e);
			setError("Failed to sign in");
		}
	};

	return (
		<main className="form-signin text-center">
			<form onSubmit={handleSubmit}>
				<h1 className="h3 mt-5 mb-3 fw-normal">Please sign in</h1>
				{error && <Alert variant="danger">{error}</Alert>}

				<div className="form-floating">
					<input
						type="email"
						className="form-control"
						id="userEmail"
						placeholder="name@example.com"
						required
						ref={emailRef}
					/>
					<label htmlFor="userEmail">Email address</label>
				</div>

				<div className="form-floating mt-2">
					<input
						type="password"
						className="form-control"
						id="userPassword"
						placeholder="Password"
						required
						ref={passwordRef}
					/>
					<label htmlFor="userPassword">Password</label>
				</div>

				<button
					className="w-100 btn btn-lg btn-primary mt-4"
					type="submit"
					disabled={loading}
				>
					Sign in
				</button>
			</form>
		</main>
	);
};

export default SignIn;
