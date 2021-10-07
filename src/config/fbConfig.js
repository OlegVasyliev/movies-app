import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAhWUAFsFAlM4vBNRNOz0m_pFvEbnfg-Gw",
	authDomain: "movies-app-228e9.firebaseapp.com",
	projectId: "movies-app-228e9",
	storageBucket: "movies-app-228e9.appspot.com",
	messagingSenderId: "905790674243",
	appId: "1:905790674243:web:50cecfc901623a24c88bf6",
	measurementId: "G-QDBBL4NBFD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const dbFirestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, dbFirestore, auth, storage };
