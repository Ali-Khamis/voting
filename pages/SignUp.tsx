import Head from "next/head";
import { useRouter } from "next/router";
import {
  HandleSubmit,
  HandleChange,
  SignInAndSignUpFunction,
  Error,
} from "../types";
import React, { useState } from "react";
import styles from "../styles/Signup.module.css";
import firebase from "firebase/app";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
const SignUp: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [passowrd, setPassword] = useState<string>("");
  const [passowrdConfirmation, setPasswordConfirmation] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [passwordEyeClicked, setPasswordEyeClicked] = useState<boolean>(false);
  const [passwordSvg, setPasswordSvg] = useState<any>(faEye);
  const [passwordconfSvg, setPasswordConfSvg] = useState<any>(faEye);
  const [
    passwordConfirmationeyeClicked,
    setPasswordConfirmationEyeClicked,
  ] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const signup: SignInAndSignUpFunction = (email, passowrd) => {
    return firebase.auth().createUserWithEmailAndPassword(email, passowrd);
  };
  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    if (passowrd === passowrdConfirmation) {
      try {
        setError("");
        setLoading(true);

        await signup(email, passowrd)
          .then(async (result) => {
            setEmail("");
            setPassword("");
            result.user.updateProfile({
              displayName: name,
            });
            result.user.sendEmailVerification();
            router.push("/");
          })
          .catch((err: Error) => {
            setError(err.message);
            if (err.code === "auth/invalid-email") {
              setError("Email Should be: example@example.com");
            } else {
              setError(err.message);
            }
          });
      } catch {
        setEmail("");
        setPassword("");
        setError("Faild to sign Up");
      }
      setLoading(false);
    } else {
      setError("Passwords doesn't match");
    }
  };
  const handleEmailChange: HandleChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange: HandleChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirmationChange: HandleChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };
  const handleNameChange: HandleChange = (e) => {
    setName(e.target.value);
  };
  const handlePasswordEyeClicked = () => {
    setPasswordEyeClicked(!passwordEyeClicked);
    if (!passwordEyeClicked) {
      setPasswordSvg(faEyeSlash);
    } else {
      setPasswordSvg(faEye);
    }
  };
  const handlPasswordConfirmationEyeClick = () => {
    setPasswordConfirmationEyeClicked(!passwordConfirmationeyeClicked);
    if (!passwordConfirmationeyeClicked) {
      setPasswordConfSvg(faEyeSlash);
    } else {
      setPasswordConfSvg(faEye);
    }
  };
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className={styles.container}>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.signupWithEmailForm}>
          <label htmlFor="name">Name</label>
          <input
            className={styles.textInput}
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            className={styles.textInput}
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@example.com"
            required
          />
          <label htmlFor="password">Password</label>
          <div className={styles.inputContainer}>
            <input
              className={styles.password}
              type={passwordEyeClicked ? "text" : "password"}
              name="password"
              value={passowrd}
              onChange={handlePasswordChange}
              placeholder="password"
              required
            />
            {passowrd && (
              <FontAwesomeIcon
                icon={passwordSvg}
                className={styles.svg}
                onClick={handlePasswordEyeClicked}
              />
            )}
          </div>
          <label htmlFor="passowrdConfirmation">Passowrd confirmation </label>
          <div className={styles.inputContainer}>
            <input
              className={styles.password}
              type={passwordConfirmationeyeClicked ? "text" : "password"}
              name="passowrdConfirmation"
              value={passowrdConfirmation}
              onChange={handlePasswordConfirmationChange}
              placeholder="password"
              required
            />
            {passowrdConfirmation && (
              <FontAwesomeIcon
                icon={passwordconfSvg}
                className={styles.svg}
                onClick={handlPasswordConfirmationEyeClick}
              />
            )}
          </div>

          <button
            type="submit"
            className={styles.signupWithEmailBtn}
            disabled={loading}
          >
            Sign Up
          </button>
        </form>
        <div className={styles.alreadyHaveAccountCheck}>
          <p className={styles.DoNotHaveAccountCheckText}>
            Already have account ?
          </p>
          <Link href="/Login">
            <a className={styles.loginLink} href="">
              Log in
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
