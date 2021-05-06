import Head from "next/head";
import { db } from "../components/auth/FirebaseAuth";
import React, { useState, useEffect } from "react";
import ImagesList from "../components/Imageslist";
import { useDispatch, useSelector } from "react-redux";
import { toggleVote } from "../reducers&stone/UserInfoSlice";
import {
  HandleImageClick,
  VoteForDifferentImage,
  VoteFunction,
  DbImage,
  SnapShotType,
} from "../types";
import homeStyles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { RootState } from "../reducers&stone/store";
import firebase from "firebase/app";
interface HomeProps {
  images: DbImage[] | undefined;
}

const Home = ({ images }: HomeProps) => {
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [working, setWorking] = useState<boolean>(true);
  const [imagesInfo, setImagesInfo] = useState<DbImage[]>(images);
  const localState = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const router = useRouter();
  let totalVotersCount: number = imagesInfo.reduce(
    (acc: number, cur: DbImage) => {
      return acc + cur.voters.length;
    },
    0
  );
  useEffect(() => {
    if (localState.userInfo.id) {
      setUserLoggedIn(true);
    } else {
      setUserLoggedIn(false);
    }
  }, [localState]);

  useEffect(() => {
    if (working) {
      db.collection("Images").onSnapshot((snapshot) => {
        let arrTest: [] | DbImage[] = [];
        snapshot.docs.forEach((image: SnapShotType) => {
          const newImage: DbImage = image.data();
          arrTest = [...arrTest, newImage];
        });
        setImagesInfo(arrTest);
      });
    }
    return () => setWorking(false);
  }, []);

  useEffect(() => {
    imagesInfo.forEach((image) => {
      image.voters.forEach((voter) => {
        if (
          localState.userInfo.id === voter &&
          !localState.userInfo.imageVotedId
        ) {
          dispatch(
            toggleVote({
              imageVotedId: image.Id,
            })
          );
        }
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
      .then((snapshot: SnapShotType) => {
        const data: DbImage = snapshot.data();
        let voters = [];
        voters = [...data.voters, localState.userInfo.id];
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
    //
    db.collection("Images")
      .doc(id)
      .get()
      .then((snapshot: SnapShotType) => {
        const data: DbImage = snapshot.data();
        let voters = data.voters.filter(
          (voter: string) => voter !== localState.userInfo.id
        );
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

  console.log(localState.userInfo);

  return (
    <div className={homeStyles.container}>
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
  let images: DbImage[] | undefined = [];

  await db
    .collection("Images")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((image: SnapShotType) => {
        const newImage: DbImage = image.data();
        images = [...images, newImage];
      });
    });

  return { props: { images } };
};
