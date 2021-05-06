import Head from "next/head";
import {
  HandleSubmit,
  HandleChange,
  ResetPasswordFunction,
  Error,
} from "../types";
import React, { useState } from "react";
import firebase from "firebase/app";
import styles from "../styles/ForgotPassword.module.css";
import Link from "next/link";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  const resetPassword: ResetPasswordFunction = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };
  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess("");
      setError("");
      await resetPassword(email)
        .then(() => {
          setSuccess("Check your email for further instructions");
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

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={styles.container}>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
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
          <button type="submit" className={styles.logWithEmailBtn}>
            Reset password
          </button>
        </form>
        <Link href="/Login">
          <a href="" className={styles.loginLink}>
            Login
          </a>
        </Link>
        <div className={styles.DoNotHaveAccountCheck}>
          <p className={styles.DoNotHaveAccountCheckText}>
            Don't have account yet?
          </p>
          <Link href="/SignUp">
            <a href="" className={styles.signUpLink}>
              Sign up
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
