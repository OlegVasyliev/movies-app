import { Link } from "react-router-dom";
import { useState } from "react";
import "../../shows/shows.css";

const BigShowCard = ({ id, name, image: { medium }, summary }) => {
	const [loading, setLoading] = useState(true);

	return (
		<div className="col-sm-6 col-lg-3 mt-4 d-flex align-items-stretch">
			<div className="card">
				<div
					className="spinner-border"
					role="status"
					style={{ display: loading ? "flex" : "none" }}
				>
					<span className="visually-hidden">Loading...</span>
				</div>
				<img
					style={{ visibility: loading ? "hidden" : "visible" }}
					className="card-img"
					src={medium}
					alt={name}
					onLoad={() => setLoading(false)}
				/>
				<div className="card-body d-flex justify-content-between flex-column">
					<h5 className="card-title">{name}</h5>
					<p className="card-text">
						{summary.replace(/(<([^>]+)>)/gi, "")}
					</p>
					<Link
						to={`/show/${id}`}
						className="btn btn-primary stretched-link"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-tv me-2"
							viewBox="0 0 16 16"
						>
							<path d="M2.5 13.5A.5.5 0 0 1 3 13h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zM13.991 3l.024.001a1.46 1.46 0 0 1 .538.143.757.757 0 0 1 .302.254c.067.1.145.277.145.602v5.991l-.001.024a1.464 1.464 0 0 1-.143.538.758.758 0 0 1-.254.302c-.1.067-.277.145-.602.145H2.009l-.024-.001a1.464 1.464 0 0 1-.538-.143.758.758 0 0 1-.302-.254C1.078 10.502 1 10.325 1 10V4.009l.001-.024a1.46 1.46 0 0 1 .143-.538.758.758 0 0 1 .254-.302C1.498 3.078 1.675 3 2 3h11.991zM14 2H2C0 2 0 4 0 4v6c0 2 2 2 2 2h12c2 0 2-2 2-2V4c0-2-2-2-2-2z" />
						</svg>
						Watch latest episode
					</Link>
				</div>
			</div>
		</div>
	);
};

export default BigShowCard;
