import React, {useContext, useState} from "react";
import {ReactComponent as LoginSvg} from "../svg/login.svg";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../UserContext";
import Popup from "./Popup";

const SignUp = () => {
  const {users, addUser} = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const {name, email, password, confirmPassword} = formData;

    // Checking if email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      setErrorMessage("Email already exists. Please choose a different email.");
      return;
    }

    // Checking all the fields
    if (
      name.trim() === "" ||
      !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email) ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      return;
    }
    setIsSubmitted(false);

    // Creating a new user object for context api
    const newUser = {
      name,
      email,
      password,
    };

    addUser(newUser);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-w-screen min-h-screen bg-indigo-500 flex items-center justify-between px-5 py-5">
      {/* Left Section */}
      <div className=" w-3/6 h-full hidden md:block flex justify-center ">
        <div className="w-full lg:w-5/6 mx-auto">
          <LoginSvg />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-3/6 md:h-full flex justify-center md:py-5  md:px-10">
        <div className="h-full w-full flex items-center text-gray-500 rounded-3xl  bg-gray-100 py-5 px-5 md:py-5 md:px-5 lg:py-10 lg:px-10">
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <h2 className="text-center text-xl lg:text-2xl font-bold text-gray-800 mb-5">
              Create your Account
            </h2>

            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-semibold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className={`border text-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-600 ${
                  isSubmitted && formData.name.trim() === ""
                    ? "border-red-500 placeholder:text-red-400 focus:placeholder:text-gray-400"
                    : "border-gray-400"
                }`}
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={formData.value}
                placeholder="e.g. John Doe"
              />
              {isSubmitted && formData.name.trim() === "" && (
                <span className="text-red-500 text-xs mt-1">
                  Name is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-semibold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`border text-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-600 ${
                  isSubmitted &&
                  !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                    formData.email
                  )
                    ? "border-red-500 placeholder:text-red-400 focus:placeholder:text-gray-400"
                    : "border-gray-400"
                }`}
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                value={formData.value}
                placeholder="you@example.com"
              />
              {isSubmitted &&
                !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(
                  formData.email
                ) && (
                  <span className="text-red-500 text-xs mt-1">
                    Invalid email format
                  </span>
                )}
              {errorMessage && (
                <span className="text-red-500 text-xs mt-1">
                  {errorMessage}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-semibold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`border text-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-600 ${
                  isSubmitted && formData.password.length < 6
                    ? "border-red-500 placeholder:text-red-400 focus:placeholder:text-gray-400"
                    : "border-gray-400"
                }`}
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                value={formData.value}
                placeholder="Must have atleast 6 characters"
              />
              {isSubmitted && formData.password.length < 6 && (
                <span className="text-red-500 text-xs mt-1">
                  Password should be at least 6 characters long
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="inline-block text-gray-700 text-sm font-semibold mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`border text-gray-700 rounded-md px-4 py-2 w-full focus:outline-none focus:border-indigo-600 ${
                  isSubmitted && formData.password !== formData.confirmPassword
                    ? "border-red-500 placeholder:text-red-400 focus:placeholder:text-gray-400"
                    : "border-gray-400 "
                }`}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.value}
                placeholder="Re-enter your Password"
              />
              {isSubmitted &&
                formData.password !== formData.confirmPassword && (
                  <span className="text-red-500 text-xs mt-1">
                    Passwords do not match
                  </span>
                )}
            </div>
            <button className="bg-indigo-500 w-full text-white py-2 px-4 rounded-md mb-5 hover:bg-indigo-600">
              Sign up
            </button>
            {showPopup && (
              <Popup message="User created successfully" onClose={closePopup} />
            )}
            <h2 className="text-gray-700 font-semibold flex flex-col items-center lg:block lg:text-center">
              Already have an account ?
              <span
                className="ml-2 text-indigo-400 hover:text-indigo-600 inline-block hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </h2>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
