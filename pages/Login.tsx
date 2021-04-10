import Head from "next/head";
import { useRouter } from "next/router";
import { HandleSubmit, HandleChange, SignInAndSignUpFunction } from "../types";
import React, { useState } from "react";
import { auth, provider } from "../firebase";
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [passowrd, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const login: SignInAndSignUpFunction = (email, passowrd) => {
    return auth.signInWithEmailAndPassword(email, passowrd);
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
        .catch((err) => {
          setError(err.message);
          console.log(err);
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
    auth
      .signInWithPopup(provider)
      .then(() => {
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <button onClick={signUpWithGoogle}>Google</button>
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
