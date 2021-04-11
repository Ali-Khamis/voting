import Head from "next/head";
import { db, auth } from "../firebase";
import React, { useState, useEffect } from "react";
import ImagesList from "../components/Imageslist";
import { useDispatch, useSelector } from "react-redux";
import { addUserInfo, toggleVote } from "../reducers&stone/UserInfoSlice";
import {
  HandleImageClick,
  UserState,
  VoteForDifferentImage,
  VoteFunction,
} from "../types";
const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [imagesInfo, setImagesInfo] = useState<any[]>([]);
  const localState: any = useSelector((state: UserState) => state);
  // const [totalVoters, setTotalVoters] = useState<number>(0);
  const dispatch = useDispatch();
  let totalVotersCount: number = imagesInfo.reduce((acc, cur) => {
    return acc + cur.voters.length;
  }, 0);
  // @@@@@@@@@@@@@@@@@@@ 5osh el style branch yad ya ali @@@@@@@@@@@@@@@@@@@@@@@@@@
  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserLoggedIn(true);
      setLoading(false);
      if (!localState.userInfo.id) {
        dispatch(
          addUserInfo({
            name: user.displayName,
            id: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            imageVotedId: "",
          })
        );
      }
    } else {
      setUserLoggedIn(false);
      if (localState.userInfo.id) {
        dispatch(
          addUserInfo({
            name: "",
            id: "",
            email: "",
            emailVerified: false,
            imageVotedId: "",
          })
        );
      }
    }
  });
  useEffect(() => {
    if (!imagesInfo[0]) {
      db.collection("Images").onSnapshot((snapshot) => {
        setLoading(false);
        setImagesInfo(snapshot.docs.map((image) => image.data()));
      });
    }
    return () => {
      if (!loading) {
        setLoading(true);
      }
    };
  }, [imagesInfo]);
  const voteForImage: VoteFunction = (id) => {
    dispatch(
      toggleVote({
        imageVotedId: id,
      })
    );
    db.collection("Images")
      .doc(id)
      .get()
      .then((snapshot) => {
        let voters = [];
        voters = [...snapshot.data().voters, localState.userInfo.id];
        db.collection("Images").doc(id).update({
          voters,
        });
      });
  };
  const unVoteForImage: VoteFunction = (id) => {
    dispatch(
      toggleVote({
        imageVotedId: id,
      })
    );
    db.collection("Images")
      .doc(id)
      .get()
      .then((snapshot) => {
        let voters = snapshot
          .data()
          .voters.filter((voter) => voter !== localState.userInfo.id);
        db.collection("Images").doc(id).update({
          voters,
        });
      });
  };
  const voteForDifferentImage: VoteForDifferentImage = (
    oldImageId,
    newImageId
  ) => {
    unVoteForImage(oldImageId);
    voteForImage(newImageId);
  };
  const handleImageClick: HandleImageClick = (id) => {
    if (!localState.userInfo.imageVotedId) {
      voteForImage(id);
    } else {
      if (id === localState.userInfo.imageVotedId) {
        unVoteForImage(id);
      } else {
        voteForDifferentImage(localState.userInfo.imageVotedId, id);
      }
    }
  };

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      {userLoggedIn ? (
        <>
          {" "}
          <main>
            <ImagesList
              handleImageClick={handleImageClick}
              imagesInfo={imagesInfo}
              totalVoters={totalVotersCount}
              localState={localState}
            />
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
};
export default Home;
