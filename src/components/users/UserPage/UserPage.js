import { useEffect } from "react";
import { useUser } from "../../../contexts/UserContext";
import UserMainInfo from "../../utilities/UserInfo/UserMainInfo";
import UserTabs from "../../utilities/UserInfo/UserTabs";

const UserPage = ({
  match: {
    params: { id },
  },
}) => {
  const { subscribeToOtherUser, otherUserInfo, otherUserPhoto } = useUser();
  useEffect(() => {
    subscribeToOtherUser(id);
  }, []);

  return (
    <>
      {otherUserInfo && (
        <>
          <UserMainInfo
            user={{
              uid: id,
              userInfo: otherUserInfo,
              userPhoto: otherUserPhoto,
            }}
          />
          <UserTabs
            user={{
              uid: id,
              userInfo: otherUserInfo,
            }}
          />
        </>
      )}
    </>
  );
};

export default UserPage;
