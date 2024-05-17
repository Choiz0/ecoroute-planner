import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "./Button";

const Login = ({
  handleSignup,
  handleLoginModal,
  setLoginModalOpen,
  loginModalOpen,
}) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await axios.post(
  //         "http://localhost:5000/login",
  //         {
  //           ...inputValue,
  //         },
  //         { withCredentials: true }
  //       );
  //       console.log(data);
  //       const { success, message } = data;
  //       if (success) {
  //         handleSuccess(message);
  //         setTimeout(() => {
  //           navigate("/userhome");
  //         }, 1000);
  //       } else {
  //         handleError(message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setInputValue({
  //       ...inputValue,
  //       email: "",
  //       password: "",
  //     });
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        ...inputValue,
      });
      const { token } = response.data;

      localStorage.setItem("token", token);

      if (response.data.success) {
        handleSuccess("Login successful");
        setTimeout(() => {
          navigate("/userhome");
        }, 1000);
      }

      return token;
    } catch (error) {
      handleError("Login Failed: " + error.message);
    }
  };
  console.log();
  console.log(handleLoginModal);
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-20">
      <div className=" relative max-h-full w-full max-w-2xl overflow-y-auto sm:rounded-2xl bg-slate-100 p-12">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-darkg ">Login</h1>
        </div>
        <div
          className="btn btn-sm  btn-circle absolute right-2 top-2 text-black"
          onClick={handleLoginModal}
        >
          ✕
        </div>
        <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-800 p-4 pe-12 text-sm shadow-sm text-gray-800"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleOnChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative text-gray-800">
              <input
                type="password"
                className="w-full rounded-lg border-gray-900 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleOnChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              No account?
              <Link className="underline" onClick={handleSignup}>
                Sign up
              </Link>
            </p>

            <Button
              type="submit"
              className="  "
              className1={"bg-teal-600 "}
              className2={"border-teal-600 text-white"}
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
