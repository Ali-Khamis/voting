import initFirebase from "../../firbase/initFirebase";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useRouter } from "next/router";
import { Error } from "../../types";

initFirebase();

const FirebaseAuth = () => {
  const router = useRouter();
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setRenderAuth(true);
    }
  });
  return (
    <div
      onClick={() => {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase
          .auth()
          .signInWithPopup(provider)
          .then(() => {
            router.push("/");
          })
          .catch((err: Error) => {});
      }}
    >
      FireBaseAuth (About Page)
    </div>
  );
};
export default FirebaseAuth;
export const db = firebase.firestore();
