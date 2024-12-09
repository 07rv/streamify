"use client";

import { AudioLines } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  //const router = useRouter();

  const [inputField, setInputField] = useState({
    email: "testlogin@gmail.com",
  });
  const [errorField, setErrorField] = useState({
    email: "",
  });

  const inputHandler = (name: string, value: string) => {
    setInputField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorField((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };
  const setErrorMessage = (name: string, value: string) => {
    setErrorField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const checkAndSetValidationsErrors = () => {
    var hasError = false;
    Object.keys(inputField).map((field) => {
      if (field === "email") {
        if (inputField[field] === "") {
          hasError = true;
          setErrorMessage(field, "Please enter emailId");
        }
      }
    });
    return hasError;
  };

  const submitButton = async () => {
    if (!checkAndSetValidationsErrors()) {
      //   const status = await signIn("credentials", {
      //     redirect: false,
      //     email: inputField.email,
      //     callbackUrl: "/",
      //   });
      //   if (status.ok) {
      //     router.push(status.url);
      //   } else {
      //   }
    }
  };
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900  rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <AudioLines className="w-8" />
              <p className="m-0 text-[16px] font-semibold dark:text-white">
                Login to your Account
              </p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy
                experience.
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400 ">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="blog@gmail.com"
                defaultValue={inputField.email}
                onChange={(e) => inputHandler(e.target.name, e.target.value)}
                className="border rounded-lg px-3 py-2 mb-1 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              />
              {errorField && errorField.email && (
                <div className=" text-red-600">
                  <small>{errorField.email}</small>
                </div>
              )}
            </div>
          </div>
          <div className="mt-5">
            <button
              onClick={submitButton}
              className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
