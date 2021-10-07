import {
	doc,
	getDoc,
	setDoc,
	updateDoc,
	getDocs,
	collection,
} from "firebase/firestore";
import { dbFirestore } from "../config/fbConfig";

export const getShowData = async (id) => {
	const showRef = doc(dbFirestore, "shows", id.toString());
	const showSnap = await getDoc(showRef);

	if (showSnap.exists()) {
		return showSnap.data();
	} else {
		return null;
	}
};

export const getAllLikedShows = async () => {
	const showsSnapshot = await getDocs(collection(dbFirestore, "shows"));

	let showsArray = [];
	showsSnapshot.forEach((doc) => {
		showsArray.push({ id: doc.id, showInfo: doc.data() });
	});

	showsArray.sort(
		(a, b) => b.showInfo.liked.length - a.showInfo.liked.length
	);
	const filteredShows = showsArray.filter(
		(show) => show.showInfo.liked.length > 0
	);

	return filteredShows;
};

export const updateShowData = async (id, userUID) => {
	const showRef = doc(dbFirestore, "shows", id.toString());
	const showSnap = await getDoc(showRef);

	if (showSnap.exists()) {
		const show = showSnap.data();
		let newLiked = [];

		if (show.liked.includes(userUID)) {
			newLiked = show.liked.filter((id) => id !== userUID);
		} else {
			newLiked = [...show.liked, userUID];
		}

		await updateDoc(showRef, {
			liked: newLiked,
		});
	} else {
		await setDoc(showRef, { liked: [userUID] });
	}

	const updatedShowSnap = await getDoc(showRef);

	if (updatedShowSnap.exists()) {
		return updatedShowSnap.data();
	} else {
		return null;
	}
};
