import Head from "next/head";
import { auth } from "../firebase";
import React, { useState, useEffect } from "react";
import ImagesList from "../components/Imageslist";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, toggleVote } from "../reducers&stone/UserInfoSlice";
import { HandleImageClick, UserState } from "../types";
export default function Home() {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  let userLocalInfo: any = useSelector((state: UserState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userName && userId && userEmail) {
      dispatch(
        addUserInfo({
          name: userName,
          id: userId,
          email: userEmail,
          emailVerified: emailVerified,
          imageVotedId: "",
        })
      );
    }
  }, [userName, userId, userEmail, emailVerified]);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserLoggedIn(true);
      setLoading(false);
      if (userLocalInfo.id === undefined) {
        setUserName(user.displayName);
        setUserId(user.uid);
        setUserEmail(user.email);
        setEmailVerified(user.emailVerified);
      }
    } else {
      setUserLoggedIn(false);
    }
  });
  const handleImageClick: HandleImageClick = (id) => {
    dispatch(
      toggleVote({
        imageVotedId: id,
      })
    );
  };
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      {loading ? (
        <h1>Loading...</h1>
      ) : userLoggedIn ? (
        <>
          {" "}
          <main>
            <ImagesList handleImageClick={handleImageClick} />
          </main>
          <footer>
            <h1>Contact us</h1>
            <p>We will be happy to hear from you on +20 012G0T0H311 😊</p>
          </footer>
        </>
      ) : (
        <h1>You have to log in to to be able to vote!</h1>
      )}
    </div>
  );
}
