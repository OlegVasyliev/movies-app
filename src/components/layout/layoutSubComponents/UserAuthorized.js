import { useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import "../layout.css";

const UserAuthorized = () => {
  const history = useHistory();
  const dropdownRef = useRef();
  const { userPhoto, signout, currentUserInfo, currentUser, updateUserInfo } =
    useUser();

  const handleLogout = async () => {
    try {
      await signout();
      if (history.location !== "/") {
        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const notificationClicked = async (notification) => {
    try {
      await updateUserInfo(currentUser.uid, {
        notifications: [],
      });

      console.log(notification.link);

      history.push(notification.link);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotificationClose = async (e) => {
    if (dropdownRef.current.classList.contains("show")) {
      return;
    }
    try {
      await updateUserInfo(currentUser.uid, {
        notifications: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="dropdown text-end d-flex align-items-center">
        {currentUserInfo && (
          <Dropdown ref={dropdownRef}>
            <Dropdown.Toggle
              id="dropdown-basic"
              className="dp-toggle me-2"
              onBlur={handleNotificationClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
              </svg>
              {currentUserInfo.notifications.length !== 0 && (
                <span className="custom-badge">
                  {currentUserInfo.notifications.length}
                </span>
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu className="notification-menu">
              {currentUserInfo.notifications.length === 0 ? (
                <p className="text-muted p-1 m-0">No new notifications</p>
              ) : (
                currentUserInfo.notifications.map((notification, i) => (
                  <div
                    onClick={() => notificationClicked(notification)}
                    key={notification.name + notification.message + i}
                    className="notification p-1"
                  >
                    <h6 className="h6 mb-1">{notification.name}</h6>
                    <p className="p-2">{notification.message}</p>
                  </div>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}

        <Link
          to="/profile"
          className="d-block text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src={
              userPhoto
                ? userPhoto
                : "https://static.tvmaze.com/images/no-img/no-avatar.jpg"
            }
            alt="mdo"
            width="80"
            height="80"
            className="rounded-circle"
          />
        </Link>
        <ul
          className="dropdown-menu text-small"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <Link className="dropdown-item" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={handleLogout}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserAuthorized;
