import { useEffect, useRef, useState } from "react";

// I know its sh*t but it's works somehow and because given API is so bad I have no other choice.
// I don't have enougn experience and time to make it how it should be done.

const complexFilter = (array, data) => {
	const uniqueID = new Set();
	const filteredArray = array.filter((show) => {
		let validShow = true;

		if (data.query !== "") {
			validShow = show.name.toLowerCase().includes(data.query);
		}
		if (data.country !== "") {
			if (!show.network) {
				return false;
			}

			validShow = show.network.country.name === data.country;
		}
		if (data.genre !== "") {
			validShow = show.genres.includes(data.genre);
		}
		if (data.language !== "") {
			validShow = show.language === data.type;
		}

		if (data.runtime !== "") {
			validShow =
				+show.runtime <= +data.runtime &&
				+show.runtime >= +data.runtime - 30;
		}
		if (data.status !== "") {
			validShow = show.status === data.status;
		}
		if (data.type !== "") {
			validShow = show.type === data.type;
		}

		validShow = validShow && !uniqueID.has(show.id);
		uniqueID.add(show.id);

		return validShow;
	});

	if (data.sort !== "" && filteredArray.length !== 0) {
		switch (data.sort) {
			case "Least popular":
				filteredArray.sort((a, b) => +a.weight - +b.weight);
				break;
			case "Highest rating":
				filteredArray.sort(
					(a, b) => +b.rating.average - +a.rating.average
				);
				break;
			case "Lowest rating":
				filteredArray.sort(
					(a, b) => +a.rating.average - +b.rating.average
				);
				break;
			case "A to Z":
				filteredArray.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				});
				break;
			case "Z to A":
				filteredArray.sort((a, b) => {
					if (a.name < b.name) {
						return 1;
					}
					if (a.name > b.name) {
						return -1;
					}
					return 0;
				});
				break;
			default:
				filteredArray.sort((a, b) => +b.weight - +a.weight);
		}
	}

	return filteredArray;
};

const useShowSearch = (data, pageNumber) => {
	const [prevData, setPrevData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [shows, setShows] = useState([]);
	const [hasMore, setHasMore] = useState(false);
	const mounted = useRef(false);

	useEffect(() => {
		mounted.current = true;

		setLoading(true);
		setError(false);

		if (data !== prevData) {
			setShows([]);
			setPrevData(data);
		}

		fetch(
			data.query !== ""
				? `https://api.tvmaze.com/search/shows?q=${data.query}`
				: `https://api.tvmaze.com/shows?page=${pageNumber}`
		)
			.then((res) => res.json())
			.then((res) => {
				const respShows =
					data.query === ""
						? [...shows, ...res]
						: res.map((item) => item.show);
				const filteredShows = complexFilter(respShows, data);
				setShows(filteredShows);
				setHasMore(filteredShows.length > 0);
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setError(e);
			});

		return () => {
			mounted.current = false;
		};
	}, [data, pageNumber]);

	return { loading, error, shows, hasMore };
};

export default useShowSearch;
