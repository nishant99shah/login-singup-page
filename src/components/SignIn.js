import React, {useContext, useState} from "react";
import {ReactComponent as LoginSvg} from "../svg/login.svg";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../UserContext";
import Popup from "./Popup";

const SignIn = () => {
  const {users} = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    if (!loginData.email) {
      setIsSubmitted(true);
      isValid = false;
      newErrors.email = "Email is required";
    } else if (
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(loginData.email)
    ) {
      setIsSubmitted(true);
      isValid = false;
      newErrors.email = "Email is invalid";
    }

    // Validate password
    if (!loginData.password) {
      setIsSubmitted(true);
      isValid = false;
      newErrors.password = "Password is required";
    } else if (loginData.password.length < 6) {
      setIsSubmitted(true);
      isValid = false;
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    if (validateForm()) {
      const user = users.find((user) => user.email === loginData.email);

      if (user) {
        if (user.password === loginData.password) {
          setShowPopup(true);
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Invalid password",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "User not found",
        }));
      }
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-indigo-500 flex items-center justify-between px-5 py-5">
      {/* Left Section */}
      <div className="w-full md:w-3/6 md:h-full flex justify-center md:py-5  md:px-10">
        <div className="h-full w-5/6 flex items-center text-gray-500 rounded-3xl  bg-gray-100 py-5 px-5 md:py-5 md:px-5 lg:py-10 lg:px-10">
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <h2 className="text-center text-xl lg:text-2xl font-bold text-gray-800 mb-5">
              Login into your Account
            </h2>

            <div className="mb-4">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className={`input ${
                  isSubmitted &&
                  !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                    loginData.email
                  )
                    ? "input-error"
                    : "border-gray-400"
                }`}
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={loginData.value}
                placeholder="Enter your registered email address"
              />
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                className={`input ${
                  isSubmitted && loginData.password.length < 6
                    ? "input-error"
                    : "border-gray-400"
                }`}
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={loginData.value}
                placeholder="Enter your 6 characters long password"
              />
              {errors.password && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.password}
                </span>
              )}
            </div>

            <button className="bg-indigo-500 w-full text-white py-2 px-4 rounded-md mb-5 hover:bg-indigo-600">
              Log In
            </button>
            {showPopup && (
              <Popup
                message="User Logged In Successfully"
                login={false}
                onClose={() => setShowPopup(false)}
              />
            )}
            <h2 className="text-gray-700 font-semibold flex flex-col items-center lg:block lg:text-center">
              Don't have an account ?
              <span
                className="ml-2 text-indigo-400 hover:text-indigo-600 inline-block hover:cursor-pointer hover:underline hover:underline-offset-2"
                onClick={() => navigate("/")}
              >
                Register here
              </span>
            </h2>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className=" w-3/6 h-full hidden md:block flex justify-center ">
        <div className="w-full lg:w-5/6 mx-auto">
          <LoginSvg />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
