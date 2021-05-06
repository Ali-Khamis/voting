import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useUser from "../firbase/useUser";
import { addUserInfo } from "../reducers&stone/UserInfoSlice";
import { UserFirebaseInfo } from "../types";
interface LayoutProps {
  children: React.ReactNode;
}
const LoggedInUserCheck = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  const { user }: { user: UserFirebaseInfo } = useUser();

  useEffect(() => {
    if (user) {
      dispatch(
        addUserInfo({
          name: user.displayName,
          id: user.uid,
          profileImgUrl: user.photoURL,
          email: user.email,
          emailVerified: user.emailVerified,
          imageVotedId: "",
        })
      );
    } else {
      dispatch(
        addUserInfo({
          name: "",
          id: "",
          email: "",
          profileImgUrl: "",
          emailVerified: false,
          imageVotedId: "",
        })
      );
    }
  }, [user]);
  return <>{children}</>;
};

export default LoggedInUserCheck;
