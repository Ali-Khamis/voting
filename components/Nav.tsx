import navStyles from "../styles/Nav.module.css";
import Link from "next/Link";
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
    dispatch(removeUserInfo({}));
  };
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {isUserLogged ? (
          <>
            <li>
              <Link href="/Login" passHref>
                <SignOut onClick={handleSignOut} href={"s"} ref={() => {}} />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/Login">Login</Link>
            </li>
            <li>
              <Link href="/SignUp">SignUp</Link>
            </li>
          </>
        )}
      </ul>
      <div>
        <p>{userLocalInfo.userInfo.name}</p>
        <p>{userLocalInfo.userInfo.email}</p>
      </div>
    </nav>
  );
};

export default Nav;
