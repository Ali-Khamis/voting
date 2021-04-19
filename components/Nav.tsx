import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import { auth } from "../firebase";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserState, HandleSignOut } from "../types";
import { removeUserInfo } from "../reducers&stone/UserInfoSlice";
import SignOut from "./SignOut";

const Nav = () => {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const userLocalInfo: any = useSelector((state: UserState) => state);
  const dispatch = useDispatch();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  });
  const handleSignOut: HandleSignOut = () => {
    auth.signOut();
    dispatch(removeUserInfo());
  };
  return (
    <nav className={navStyles.container}>
      <div className={navStyles.nav}>
        {isUserLogged ? (
          <div className={navStyles.userInfosContainer}>
            {userLocalInfo.userInfo.profileImgUrl && (
              <img
                src={userLocalInfo.userInfo.profileImgUrl}
                className={navStyles.profileImage}
                alt="User profile picture"
              />
            )}

            <div>
              <p className={navStyles.userInfo}>
                {userLocalInfo.userInfo.name}
              </p>
              <p className={navStyles.userInfo}>
                {userLocalInfo.userInfo.email}
              </p>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <ul className={navStyles.ul}>
          {isUserLogged ? (
            <>
              <li className={navStyles.li}>
                <Link href="/">Home</Link>
              </li>
              <li className={navStyles.li}>
                <Link href="/Login" passHref>
                  <SignOut onClick={handleSignOut} href={"s"} ref={() => {}} />
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={navStyles.li}>
                <Link href="/Login">Login</Link>
              </li>
              <li className={navStyles.li}>
                <Link href="/SignUp">SignUp</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
