import { useUser } from "../../../contexts/UserContext";
import UserMainInfo from "../../utilities/UserInfo/UserMainInfo";
import UserTabs from "../../utilities/UserInfo/UserTabs";

const Profile = () => {
  const { currentUser, currentUserInfo, userPhoto } = useUser();

  return (
    <>
      {currentUser && currentUserInfo && (
        <>
          <UserMainInfo
            user={{
              uid: currentUser.uid,
              userInfo: currentUserInfo,
              userPhoto,
            }}
          />
          <UserTabs
            user={{
              uid: currentUser.uid,
              userInfo: currentUserInfo,
            }}
          />
        </>
      )}
    </>
  );
};

export default Profile;
