import navStyles from "../styles/Nav.module.css";
import Link from "next/link";
import firebase from "firebase/app";
// import { auth } from "../firebase";
// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InitialState, HandleSignOut } from "../types";
import { removeUserInfo } from "../reducers&stone/UserInfoSlice";
import SignOut from "./SignOut";
import useUser from "../firbase/useUser";

const Nav = () => {
  const userLocalInfo = useSelector((state: InitialState) => state.userInfo);
  const dispatch = useDispatch();
  const { logout } = useUser();
  const handleSignOut: HandleSignOut = () => {
    logout();
    dispatch(removeUserInfo());
  };
  return (
    <div>
      <nav className={navStyles.container}>
        <div className={navStyles.nav}>
          {userLocalInfo.id ? (
            <div className={navStyles.userInfosContainer}>
              {userLocalInfo.profileImgUrl && (
                <img
                  src={userLocalInfo.profileImgUrl}
                  className={navStyles.profileImage}
                  alt="User profile picture"
                />
              )}
              <div>
                <p className={navStyles.userInfo}>{userLocalInfo.name}</p>
                <p className={navStyles.userInfo}>{userLocalInfo.email}</p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <ul className={navStyles.ul}>
            {userLocalInfo.id ? (
              <>
                <li className={navStyles.li}>
                  <Link href="/">Home</Link>
                </li>
                <li className={navStyles.li}>
                  <Link href="/Login" passHref>
                    <SignOut
                      onClick={handleSignOut}
                      href={"s"}
                      ref={() => {}}
                    />
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
      {userLocalInfo.id && !userLocalInfo.emailVerified && (
        <div className={navStyles.emailVerifing}>
          Check your inbox to verify your email then refresh the page
        </div>
      )}
    </div>
  );
};
export default Nav;
