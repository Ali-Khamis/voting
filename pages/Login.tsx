import Head from "next/head";
import { useRouter } from "next/router";
import {
  HandleSubmit,
  HandleChange,
  SignInAndSignUpFunction,
  Error,
} from "../types";
import React, { useState } from "react";
import firebase from "firebase/app";
import styles from "../styles/Login.module.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [passowrd, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordEyeClicked, setPasswordEyeClicked] = useState<boolean>(false);
  const [passwordSvg, setPasswordSvg] = useState<any>(faEye);
  const router = useRouter();

  const login: SignInAndSignUpFunction = (email, passowrd) => {
    return firebase.auth().signInWithEmailAndPassword(email, passowrd);
  };

  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, passowrd)
        .then(() => {
          router.push("/");
        })
        .catch((err: Error) => {
          setError(err.message);
        });
    } catch {
      setError("Faild to sign in");
    }
  };
  const handleEmailChange: HandleChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange: HandleChange = (e) => {
    setPassword(e.target.value);
  };
  const signUpWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        router.push("/");
      })
      .catch((err: Error) => {});
  };
  const handlePasswordEyeClicked = () => {
    setPasswordEyeClicked(!passwordEyeClicked);
    if (!passwordEyeClicked) {
      setPasswordSvg(faEyeSlash);
    } else {
      setPasswordSvg(faEye);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.googleBtn} onClick={signUpWithGoogle}>
          <div className={styles.googleIconWrapper}>
            <img
              className={styles.googleIcon}
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className={styles.btnText}>
            <b>Sign in with google</b>
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.logWithEmailForm}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={styles.textInput}
            placeholder="example@example.com"
          />
          <label htmlFor="password">Password</label>
          <div className={styles.inputContainer}>
            <input
              type={passwordEyeClicked ? "text" : "password"}
              name="password"
              id="password"
              value={passowrd}
              onChange={handlePasswordChange}
              required
              className={styles.password}
              placeholder="password"
            />
            {passowrd && (
              <FontAwesomeIcon
                icon={passwordSvg}
                className={styles.svg}
                onClick={handlePasswordEyeClicked}
              />
            )}
          </div>
          <button type="submit" className={styles.logWithEmailBtn}>
            Login
          </button>
        </form>
        <div className={styles.DoNotHaveAccountCheck}>
          <p className={styles.DoNotHaveAccountCheckText}>
            Don't have account yet?
          </p>
          <Link href="/SignUp">
            <a href="" className={styles.SignupLink}>
              Sign up
            </a>
          </Link>
        </div>
        <Link href="/ForgotPassword">
          <a href="" className={styles.SignupLink}>
            ForgotPassword
          </a>
        </Link>
      </div>
    </>
  );
};

export default Login;
