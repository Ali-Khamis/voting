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
import homeStyles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home = ({ images }) => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(true);
  const [imagesInfo, setImagesInfo] = useState<any[]>(images);
  const localState: any = useSelector((state: UserState) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  let totalVotersCount: number = imagesInfo.reduce((acc, cur) => {
    return acc + cur.voters.length;
  }, 0);
  // console.log(localState);

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        // console.log(user);

        setUserLoggedIn(true);
        if (!localState.userInfo.id) {
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
        }
      } else {
        setUserLoggedIn(false);
        if (localState.userInfo.id) {
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
        router.push("/Login");
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (working) {
      db.collection("Images").onSnapshot((snapshot) => {
        setLoading(false);
        setImagesInfo(snapshot.docs.map((image) => image.data()));
      });
    }
    return () => setWorking(false);
  }, []);

  useEffect(() => {
    db.collection("Images")
      .get()
      .then((images) => {
        images.docs.forEach((image) => {
          image.data().voters.forEach((voter) => {
            if (
              localState.userInfo.id === voter &&
              !localState.userInfo.imageVotedId
            ) {
              dispatch(
                toggleVote({
                  imageVotedId: image.data().Id,
                })
              );
            }
          });
        });
      });
  }, [localState.userInfo.id]);

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
    <div className={homeStyles.container}>
      {loading && <h1>loading....</h1>}
      <Head>
        <title>Home</title>
      </Head>
      {userLoggedIn ? (
        <>
          {" "}
          <div className={homeStyles.container}>
            <ImagesList
              handleImageClick={handleImageClick}
              imagesInfo={imagesInfo}
              totalVoters={totalVotersCount}
              localState={localState}
            />
          </div>
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

export const getStaticProps = async () => {
  let images;
  await db
    .collection("Images")
    .get()
    .then((snapshot) => {
      images = snapshot.docs.map((image) => image.data());
    });
  return { props: { images } };
};
