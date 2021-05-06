import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../firbase/initFirebase";
import { mapUserData } from "./mapUserData";

initFirebase();

const useUser = () => {
  const [user, setUser] = useState<any>();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/Login");
      })
      .catch((e) => {});
  };

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUser(userData);
      } else {
        setUser(null);
      }
    });
  }, []);

  return { user, logout };
};

export default useUser;
