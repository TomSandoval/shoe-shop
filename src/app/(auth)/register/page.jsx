"use client";

import "./pageRegister.css";
import img from "../../../../public/assets/login-shoe.png";
import Link from "next/link";
import useWindowDimensions from "@/Hooks/UseWindowDimensions";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {toast } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const session = useSession();


  useEffect(()=> {
    if (session.status === "authorized" || session.status === "authenticated" ) {
      router.push("/")
    }
  },[session])


  const { width, height } = useWindowDimensions();
  const [error, setError] = useState();
  const [succes, setSucces] = useState();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errorsForm, setErrorForm] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validationFormData = (form) => {
    const formError = {};

    if (form?.username.length === 0) {
      formError.username = "Username is required";
    } else {
      if (form?.username.length > 18 || form?.username.length < 3) {
        formError.username = "Username must be between 3 and 18 characters";
      }
    }

    if (!emailRegex.test(form.email)) {
      formError.email = "Email invalid";
    }

    if(form.password.length === 0) {
      formError.password = "Password ir required"
    } else {
      if (form.password.length < 5) {
        formError.password = "Very weak password";
      }
    }

    if (form.repeatPassword !== form.password) {
      formError.repeatPassword = "Passwords do not match";
    }

    setErrorForm(formError);

    return formError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validationFormData(formData);


    const errorsArray = Object.values(errors);
    const firstNonEmptyValue = errorsArray.find((value) => value !== "");

    if (firstNonEmptyValue) {
      return null
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/register', JSON.stringify(formData))




        setSucces(response.data)
        setError("");
        toast.success(response.data)
        
        
        router.push("/login")

      } catch (error) {
        setSucces();
        setError(error.response.data)
      }
    }
  };

  return (
    <section className="register-section-all-container">
      <div className="left-section-register">
        <div className="welcome-message-register">
          <h2>Welcome!</h2>
          <p>Register to get all the information about our sneakers!</p>
        </div>

        <form onSubmit={handleSubmit} action="register">
          <div className="inputs-register-container">
            <div className="username-register-input-container">
              <label htmlFor="username">Username</label>
              {errorsForm.username && (
                <span className="error-validation-input">
                  {errorsForm.username}
                </span>
              )}
              <input
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="email-register-input-container">
              <label htmlFor="email">Email</label>
              {errorsForm.email && (
                <span className="error-validation-input">
                  {errorsForm.email}
                </span>
              )}
              <input
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="password-register-input-container">
              <label htmlFor="password">Password</label>
              {errorsForm.password && (
                <span className="error-validation-input">
                  {errorsForm.password}
                </span>
              )}
              <input
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="repeat-password-register-input-container">
              <label htmlFor="password">Repeat Password</label>
              {errorsForm.repeatPassword && (
                <span className="error-validation-input">
                  {errorsForm.repeatPassword}
                </span>
              )}
              <input
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
              />
            </div>
          </div>
          <div className="button-register-container">
            <button>Register</button>
          </div>
        </form>
        <Link className="have-account-link-register" href={"/login"}>
          Do you have account? Sign In
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
        <div className="right-section-register">
          <h2>Days can't start with out perfect shoes</h2>
          <img src={img.src} alt="shoe-register" />
        </div>
      )}
    </section>
  );
}
