import navStyles from "../styles/Nav.module.css";
import Link from "next/Link";
import { auth } from "../firebase";
import { useState } from "react";
const Nav = () => {
  const [isUserLogged, setIsUserLogged] = useState<boolean>(true);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserLogged(true);
    } else {
      setIsUserLogged(false);
    }
  });
  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
  };
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!isUserLogged ? (
          <>
            {" "}
            <li>
              <Link href="/Login">Login</Link>
            </li>
            <li>
              <Link href="/SignUp">SignUp</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <a href="" onClick={handleSignOut}>
                SighOut
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
