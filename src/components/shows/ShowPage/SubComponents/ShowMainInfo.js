import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import {
  getShowData,
  updateShowData,
} from "../../../../api/firestore.shows.api";
import { useUser } from "../../../../contexts/UserContext";
import { useGetAsyncData } from "../../../hooks/useGetAsyncData";

const ShowMainInfo = ({ show }) => {
  const { currentUser, currentUserInfo, updateUserInfo, getUserInfo } =
    useUser();
  const [firestoreShow, setFirestoreShow] = useState();
  const [friends, setFriends] = useState([]);

  useGetAsyncData(() => getShowData(show.id), setFirestoreShow);

  const loadFriends = () => {
    setFriends([]);
    currentUserInfo.friends.forEach(async (friendUID) => {
      const friend = await getUserInfo(friendUID);
      setFriends((prevValue) => [
        ...prevValue,
        { uid: friendUID, userInfo: friend },
      ]);
    });
  };

  useEffect(() => {
    if (!currentUserInfo) {
      return;
    }

    loadFriends();
  }, [currentUserInfo]);

  const recomendToFriend = async (friend) => {
    try {
      const updatedFriendInfo = await getUserInfo(friend.uid);
      await updateUserInfo(friend.uid, {
        notifications: [
          ...updatedFriendInfo.notifications,
          {
            name: currentUserInfo.firstname + " " + currentUserInfo.lastname,
            message: "Recomends you to watch show " + show.name,
            link: `/show/${show.id}`,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFavourite = async () => {
    try {
      await updateUserInfo(currentUser.uid, {
        favourite: [...currentUserInfo.favourite, show.id],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavourite = async () => {
    try {
      await updateUserInfo(currentUser.uid, {
        favourite: currentUserInfo.favourite.filter(
          (favourite) => favourite !== show.id
        ),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikes = async () => {
    try {
      const updatedFirestoreShow = await updateShowData(
        show.id,
        currentUser.uid
      );

      setFirestoreShow(updatedFirestoreShow);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3 p-3 show-wrap">
      <div className="row">
        <div className="col-sm-12 col-md-2 d-flex flex-column align-items-center ms-2">
          <img className="img-shadow" src={show.image.medium} alt={show.name} />
          {currentUser &&
            currentUserInfo &&
            (currentUserInfo.favourite.includes(show.id) ? (
              <Button
                className="mt-4"
                variant="info"
                onClick={handleRemoveFavourite}
              >
                Remove from favourite
              </Button>
            ) : (
              <Button
                className="mt-4"
                variant="success"
                onClick={handleAddFavourite}
              >
                Add to favourite
              </Button>
            ))}
        </div>
        <div className="col-sm-12 col-md-9 ms-3  d-flex flex-column justify-content-between">
          <div>
            <h2 className="h2">{show.name}</h2>
            <p>{show.summary.replace(/(<([^>]+)>)/gi, "")}</p>
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <p className="mb-1">
                  <strong>Language: </strong>
                  {show.language}
                </p>
                <p className="mb-1">
                  <strong>Genres: </strong>
                  {show.genres.join(", ")}
                </p>
                <p className="mb-1">
                  <strong>Genres: </strong>
                  {show.type}
                </p>
                <p className="mb-1">
                  <strong>
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
                    </svg>
                  </strong>{" "}
                  {show.rating.average} stars
                </p>
              </div>
              <div className="col-sm-12 col-md-6">
                <p className="mb-1">
                  <strong>Status: </strong>
                  {show.status}
                </p>
                <p className="mb-1">
                  <strong>Schedule: </strong>
                  {show.schedule.time ? show.schedule.time : ""}
                  {show.schedule.days.length !== 0
                    ? " at " + show.schedule.days.join(", ")
                    : ""}
                </p>
                <p className="mb-1">
                  <strong>Runtime: </strong>
                  {show.runtime ? show.runtime + " minutes" : ""}
                </p>
                <p className="mb-1">
                  <strong>Premiere: </strong>
                  {show.premiered}
                </p>
              </div>
            </div>
            <p className="mt-3 mb-3">
              <strong>Official site: </strong>
              <a href={show.officialSite}>{show.officialSite}</a>
            </p>
          </div>
          <div className="d-flex">
            {currentUser && currentUserInfo && (
              <DropdownButton
                className="me-2"
                id="dropdown-basic-button"
                title="Recommend it"
              >
                {friends && friends.length !== 0 ? (
                  friends.map((friend, i) => (
                    <Dropdown.Item
                      key={friend.uid}
                      onClick={() => recomendToFriend(friend)}
                    >
                      {friend.userInfo.firstname +
                        " " +
                        friend.userInfo.lastname}
                    </Dropdown.Item>
                  ))
                ) : (
                  <p className="text-muted m-0 px-2">No friends</p>
                )}
              </DropdownButton>
            )}
            {currentUser &&
              currentUserInfo &&
              (firestoreShow &&
              firestoreShow.liked.includes(currentUser.uid) ? (
                <Button
                  className="me-2"
                  variant="outline-warning"
                  onClick={handleLikes}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </svg>
                  Remove like
                </Button>
              ) : (
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={handleLikes}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-heart-fill me-2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                  Like it
                </Button>
              ))}
            <p className="text-muted text-warning mb-2 d-flex align-items-end">
              {firestoreShow ? firestoreShow.liked.length : "0"} users liked it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMainInfo;
