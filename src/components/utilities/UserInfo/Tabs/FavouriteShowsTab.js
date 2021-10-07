import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import SmallShowCard from "../../Cards/SmallShowCard";

const FavouriteShowsTab = ({ showsIDs }) => {
	const [loading, setLoading] = useState(true);
	const [favouriteShows, setFavouriteShows] = useState([]);
	const [query, setQuery] = useState("");

	const loadFavouriteShows = () => {
		setFavouriteShows([]);
		showsIDs.forEach(async (showID) => {
			const show = await (
				await fetch(`https://api.tvmaze.com/shows/${showID}`)
			).json();
			setFavouriteShows((prevValue) => [...prevValue, show]);
		});
	};

	useEffect(() => {
		loadFavouriteShows();
	}, []);

	useEffect(() => {
		setLoading(false);
	}, [favouriteShows]);

	return (
		<div
			className="tab-pane active"
			id="favourite"
			role="tabpanel"
			aria-labelledby="favourite-tab"
		>
			<Form.Control
				className="mt-2"
				type="text"
				placeholder="Show name"
				onChange={(e) => setQuery(e.target.value)}
			/>
			{!loading && (
				<div className="container">
					<div className="row">
						{favouriteShows.length !== 0 ? (
							favouriteShows
								.filter((show) => {
									if (query !== "") {
										return show.name
											.toLocaleLowerCase()
											.includes(query);
									}
									return true;
								})
								.map((show) => {
									return (
										<SmallShowCard
											key={show.id}
											show={show}
										/>
									);
								})
						) : (
							<p className="text-muted mt-2">
								No favourite shows yet
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default FavouriteShowsTab;
