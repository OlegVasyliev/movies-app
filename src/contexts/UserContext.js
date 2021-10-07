import React, { useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { dbFirestore, auth, storage } from "../config/fbConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [otherUserInfo, setOtherUserInfo] = useState();
  const [otherUserPhoto, setOtherUserPhoto] = useState();
  const [otherUserUID, setOtherUserUID] = useState();

  const [loading, setLoading] = useState(true);

  const signup = async (email, password, firstname, lastname) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (resp) => {
        return setDoc(doc(dbFirestore, "users", resp.user.uid), {
          email,
          firstname,
          lastname,
          about: "",
          favGenres: [],
          photo: "",
          friends: [],
          notifications: [],
          favourite: [],
          recommendedToUser: [],
        });
      }
    );
  };

  const signin = (email, password) => {
    setUserPhoto(null);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signout = () => {
    return signOut(auth);
  };

  const getUserInfo = async (uid) => {
    const docRef = doc(dbFirestore, "users", uid);
    return (await getDoc(docRef)).data();
  };

  // Unfortunately this function is pretty slow, so expect some delay everywhere this function is used
  // This function is used for:
  // 	1.Navbar user photo
  // 	2.AllUsersPage for user cards
  //  	3.ProfilePage and UserPage for user photo and friends
  const getProfilePhoto = async (user) => {
    if (!user || user.photo === "") {
      return null;
    }

    return getDownloadURL(ref(storage, user.photo)).then((url) => {
      return url;
    });
  };

  const getAllUsers = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(dbFirestore, "users"));
    querySnapshot.forEach((doc) => {
      users.push({ uid: doc.id, userInfo: doc.data() });
    });

    return users;
  };

  const getAllUsersWithoutSelf = async () => {
    const users = [];
    const querySnapshot = await getDocs(collection(dbFirestore, "users"));
    querySnapshot.forEach((doc) => {
      if (currentUser.uid !== doc.id) {
        users.push({ uid: doc.id, userInfo: doc.data() });
      }
    });

    return users;
  };

  const updateUserEmail = async (email, pass, newEmail) => {
    const credentials = EmailAuthProvider.credential(email, pass);
    const user = auth.currentUser;
    return reauthenticateWithCredential(user, credentials)
      .then(() => {
        return updateEmail(user, newEmail);
      })
      .then(() => {
        return updateDoc(doc(dbFirestore, "users", user.uid), {
          email: newEmail,
        });
      });
  };

  const updateUserPassword = async (email, oldPass, newPass) => {
    const credentials = EmailAuthProvider.credential(email, oldPass);
    const user = auth.currentUser;
    return reauthenticateWithCredential(user, credentials)
      .then(() => {
        return updatePassword(user, newPass);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateProfilePhoto = async (photo) => {
    if (!currentUser) {
      return null;
    }

    const refStr = `${currentUser.uid}/${photo.name}`;

    return uploadBytes(ref(storage, refStr), photo).then(() => {
      return updateDoc(doc(dbFirestore, "users", currentUser.uid), {
        photo: refStr,
      });
    });
  };

  const updateUserInfo = async (uid, data) => {
    return updateDoc(doc(dbFirestore, "users", uid), data);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    setLoading(true);

    const unsubscribeInfo = onSnapshot(
      doc(dbFirestore, "users", currentUser.uid),
      (doc) => {
        const user = doc.data();
        setCurrentUserInfo(user);
        if (!user) {
          return;
        }
        if (user.photo !== "") {
          getDownloadURL(ref(storage, user.photo)).then((url) => {
            setUserPhoto(url);
            setLoading(false);
          });
        } else {
          setUserPhoto(null);
          setLoading(false);
        }
      }
    );

    return unsubscribeInfo;
  }, [currentUser]);

  const subscribeToOtherUser = (uid) => {
    setOtherUserUID(uid);
  };

  useEffect(() => {
    if (!otherUserUID) {
      return;
    }
    setLoading(true);

    const unsubscribeOther = onSnapshot(
      doc(dbFirestore, "users", otherUserUID),
      (doc) => {
        const user = doc.data();
        setOtherUserInfo(user);
        if (user.photo !== "") {
          getDownloadURL(ref(storage, user.photo)).then((url) => {
            setOtherUserPhoto(url);
            setLoading(false);
          });
        } else {
          setOtherUserPhoto(null);
          setLoading(false);
        }
      }
    );

    return unsubscribeOther;
  }, [otherUserUID]);

  const userAPI = {
    currentUser,
    currentUserInfo,
    userPhoto,
    otherUserInfo,
    otherUserPhoto,
    signin,
    signup,
    signout,
    updateUserPassword,
    updateUserEmail,
    updateProfilePhoto,
    updateUserInfo,
    getUserInfo,
    getAllUsers,
    getAllUsersWithoutSelf,
    getProfilePhoto,
    updateEmail,
    updatePassword,
    subscribeToOtherUser,
  };

  return (
    <UserContext.Provider value={userAPI}>{children}</UserContext.Provider>
  );
};
