"use client";

import "./pageLogin.css";
import img from "../../../../public/assets/login-shoe.png";
import Link from "next/link";
import { getProviders, signIn, useSession } from "next-auth/react";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    setError(params.get("error"));
    setSuccess(params.get("success"));
  }, [params]);


  useEffect(()=> {
    if (session.status === "authenticated") {
      router?.push("/");
    }
  },[session])

  const handlerSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <section className="login-section-all-container">
      <div className="left-section-login">
        <div className="welcome-message-login">
          <h2>Welcome</h2>
          <p>Log in to find the best sneakers for you!</p>
        </div>

        <form className="form-login" onSubmit={handlerSubmit} action="login">
          <div className="inputs-login-container">
            <div className="email-login-input-container">
              <label htmlFor="email">Email</label>
              <input placeholder="Email" type="text" name="email" id="email" />
            </div>
            <div className="password-login-input-container">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
          {error && <span>Wrong email or password</span>}
          <div className="button-login-container">
            <button>Log In</button>
          </div>
        </form>
          <Link className="not-have-account-link-login" href={'/register'}>
          You do not have an account? Sign up
          </Link>
        <div className="login-auth-container">
          <div className="login-auth-or-container">
            <div className="login-auth-hr"></div>
            <span>Or</span>
            <div className="login-auth-hr"></div>
          </div>
          <button
            onClick={() => {
              signIn("google");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>{" "}
            Continue with Google
          </button>
        </div>
      </div>
      {width > 800 && (
        <div className="right-section-login">
          <h2>Days can't start with out perfect shoes</h2>
          <img src={img.src} alt="shoe-login" />
        </div>
      )}
    </section>
  );
}
