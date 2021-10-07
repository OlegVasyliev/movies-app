import { forwardRef } from "react";
import { Link } from "react-router-dom";

const SmallShowCard = forwardRef(({ show }, ref) => {
	return (
		<div
			className="col-sm-4 col-lg-2 mt-4 d-flex align-items-stretch"
			ref={ref}
		>
			<div className="card">
				<img
					className="card-img-top"
					src={
						show.image
							? show.image.medium
							: "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
					}
					alt={show.name}
				/>
				<div className="card-body d-flex flex-column">
					<h5 className="card-title">
						<Link
							to={`/show/${show.id}`}
							className="link-dark stretched-link"
						>
							{show.name}
						</Link>
					</h5>
					<p className="card-text mb-2">
						Rating:{" "}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							className="bi bi-star-fill"
							viewBox="0 0 16 16"
						>
							<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
						</svg>{" "}
						{show.rating.average}
					</p>
				</div>
			</div>
		</div>
	);
});

export default SmallShowCard;
