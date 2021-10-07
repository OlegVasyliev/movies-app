// Get today string
const now = new Date();
const strNow =
	now.getFullYear() +
	"-" +
	("0" + (now.getMonth() + 1)).slice(-2) +
	"-" +
	("0" + (now.getUTCDate() + 1)).slice(-2);

// Get specific show by id
export const getShow = async (showID) => {
	const response = await fetch(
		`https://api.tvmaze.com/shows/${showID}?embed[]=episodes&embed[]=seasons&embed[]=cast&embed[]=images&embed[]=crew`
	);
	if (!response.ok) {
		throw response;
	}

	return await response.json();
};

// Get airing today shows
export const getTodayShows = async (targetNumber = 8, sliceArr = true) => {
	const response = await fetch(
		`https://api.tvmaze.com/schedule?date=${strNow}`
	);
	if (!response.ok) {
		throw response;
	}

	const data = await response.json();
	const shows = data.map((item) => item.show); // Get only shows data
	shows.sort((a, b) => +b.weight - +a.weight); // Sort by weight AKA popularity

	const uniqueID = new Set();
	const todayShows = shows.filter((show) => {
		if (!uniqueID.has(show.id)) {
			uniqueID.add(show.id);
			return true;
		}
		return false;
	}); // Only unique entries by show ID

	if (sliceArr) {
		return todayShows.slice(0, targetNumber);
	}

	return todayShows;
};

// Get random shows
export const getRandomShows = async (quantityOfShows = 4) => {
	const pageNum = 231; // Last known not empty page
	const randomPage = Math.floor(Math.random() * (pageNum - 1 + 1)) + 1;

	const data = await (
		await fetch(`https://api.tvmaze.com/shows?page=${randomPage}`)
	).json();

	const randomShowsIDSet = new Set();
	const filteredShows = data.filter((show) => {
		if (
			!randomShowsIDSet.has(show.id) &&
			show.image &&
			show.image.medium &&
			show.rating.average
		) {
			randomShowsIDSet.add(show.id);
			return true;
		}
		return false;
	});

	return Array(quantityOfShows)
		.fill(0)
		.map(
			() =>
				filteredShows[Math.floor(Math.random() * filteredShows.length)]
		);
};
