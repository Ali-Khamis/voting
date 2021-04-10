import Head from "next/head";
import { useRouter } from "next/router";
import { HandleSubmit, HandleChange, SignInAndSignUpFunction } from "../types";
import React, { useState } from "react";
import { auth } from "../firebase";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [passowrd, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");
  const router = useRouter();

  const signup: SignInAndSignUpFunction = (email, passowrd) => {
    return auth.createUserWithEmailAndPassword(email, passowrd);
  };

  const handleSubmit: HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await signup(email, passowrd)
        .then(() => {
          setEmail("");
          setPassword("");
          router.push("/");
        })
        .catch((err) => {
          setError(err.message);
          if (err.code === "auth/invalid-email") {
            setErrMessage("Email Should be: example@example.com");
          } else {
            setErrMessage(err.message);
          }
        });
    } catch {
      setEmail("");
      setPassword("");
      setError("Faild to sign Up");
    }
  };
  const handleEmailChange: HandleChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange: HandleChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={passowrd}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {errMessage && <h2>{errMessage}</h2>}
    </>
  );
};

export default Login;
