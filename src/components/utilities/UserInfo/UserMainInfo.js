import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useUser } from "../../../contexts/UserContext";
import "../../users/users.css";
import EditCredentials from "./EditCredentials";
import EditInfo from "./EditInfo";
import UserInfo from "./UserInfo";

const UserMainInfo = ({ user }) => {
  const fileInput = useRef();
  const [editForm, setEditForm] = useState(false);
  const { updateUserInfo, currentUser, currentUserInfo, updateProfilePhoto } =
    useUser();

  const updateProfilePicture = async (e) => {
    const photo = e.target.files[0];

    try {
      await updateProfilePhoto(photo);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddFriend = async () => {
    try {
      // update your friends list
      await updateUserInfo(currentUser.uid, {
        friends: [...currentUserInfo.friends, user.uid],
      });

      // add yourself as friend to this user and send notification
      await updateUserInfo(user.uid, {
        friends: [...user.userInfo.friends, currentUser.uid],
        notifications: [
          ...user.userInfo.notifications,
          {
            name: currentUserInfo.firstname + " " + currentUserInfo.lastname,
            message: "added you to his friends list",
            link: `/user/${currentUser.uid}`,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      // remove this user from your friends list
      await updateUserInfo(currentUser.uid, {
        friends: currentUserInfo.friends.filter(
          (friendUID) => friendUID !== user.uid
        ),
      });

      // remove yourself from this user friends list
      await updateUserInfo(user.uid, {
        friends: user.userInfo.friends.filter(
          (friendUID) => friendUID !== currentUser.uid
        ),
        notifications: [
          ...user.userInfo.notifications,
          {
            name: currentUserInfo.firstname + " " + currentUserInfo.lastname,
            message: "removed you from his friends list",
            link: `/user/${currentUser.uid}`,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3 p-3 show-wrap">
      <div className="row">
        <div className="col-sm-12 col-md-3 d-flex flex-column align-items-center">
          <div
            className={`${
              currentUser.uid === user.uid && "profilepic"
            } img-shadow`}
            onClick={() => {
              if (currentUser.uid === user.uid) {
                fileInput.current.click();
              }
            }}
          >
            {currentUser.uid === user.uid && (
              <input
                id="file"
                name="file"
                type="file"
                onChange={updateProfilePicture}
                ref={fileInput}
              />
            )}
            <img
              className={
                currentUser.uid === user.uid ? "profilepic__image" : ""
              }
              src={
                user.userPhoto
                  ? user.userPhoto
                  : "https://static.tvmaze.com/images/no-img/no-avatar.jpg"
              }
              alt={user.userInfo.firstname + " " + user.userInfo.lastname}
              width="300"
            />
            {currentUser.uid === user.uid && (
              <div className="profilepic__content">
                <span className="profilepic__icon">
                  <i className="fas fa-camera"></i>
                </span>
                <span className="profilepic__text">Edit Profile</span>
              </div>
            )}
          </div>
          <div
            className={`d-flex justify-content-${
              currentUser.uid === user.uid ? "between" : "center"
            } w-100`}
          >
            {currentUser.uid === user.uid ? (
              !editForm && (
                <>
                  <Button
                    className="mt-4 px-4"
                    variant="success"
                    onClick={() => setEditForm("info")}
                  >
                    Edit Info
                  </Button>
                  <Button
                    className="mt-4"
                    variant="warning"
                    onClick={() => setEditForm("credentials")}
                  >
                    Change Credentials
                  </Button>
                </>
              )
            ) : currentUserInfo.friends.includes(user.uid) ? (
              <Button
                className="mt-4 px-4"
                variant="danger"
                onClick={handleRemoveFriend}
              >
                Remove from friends
              </Button>
            ) : (
              <Button
                className="mt-4 px-4"
                variant="success"
                onClick={handleAddFriend}
              >
                Add to friends
              </Button>
            )}
          </div>
        </div>
        {editForm ? (
          editForm === "info" ? (
            <EditInfo closer={() => setEditForm(false)} />
          ) : (
            <EditCredentials closer={() => setEditForm(false)} />
          )
        ) : (
          <UserInfo userInfo={user.userInfo} />
        )}
      </div>
    </div>
  );
};

export default UserMainInfo;
