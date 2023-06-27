import React from "react";
import {useNavigate} from "react-router-dom";

const Popup = ({message, onClose}) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col bg-white rounded-lg p-5 transform transition-all duration-300">
        <div className="flex justify-end my-2">
          <svg
            className="h-6 w-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
            onClick={() => onClose()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h2 className="text-3xl text-gray-700 font-semibold mb-3 text-center">
          Congratulations !!
        </h2>
        <p className="text-lg text-gray-600 font-medium text-center mb-2">
          {message}
        </p>
        <p
          className="text-lg font-bold text-indigo-500 hover:text-indigo-600 text-center hover:cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login Here
        </p>
      </div>
    </div>
  );
};

export default Popup;
