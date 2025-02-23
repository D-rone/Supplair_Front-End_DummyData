import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import SidePage from "../../components/Side/SidePage";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supplairAPI } from "../../utils/axios";

library.add(faLock);

export default function ConfirmPwd() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPasswordForgotten, setIsPasswordForgotten] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const url = window.location.href;

  // Define a regular expression to match the token
  const tokenRegex = /confirm-password\/([^\/]+)/;
  // Extract the token from the URL using the regular expression
  const match = url.match(tokenRegex);
  const token = match[1]; // Extracted token

  useEffect(() => {
    const isPasswordForgotten = res.data;
    setIsPasswordForgotten(isPasswordForgotten);
  }, [location.pathname]);

  const handleClick = () => {
    setIdFromButtonClick(id);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Perform validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      toast.dismiss();
      toast.success("Password saved successfully", { autoClose: false });
      navigate("/login", { replace: true });
    } catch (error) {}
  };
  return (
    <>
      {isPasswordForgotten ? (
        // Your component content when isPasswordForgotten is true
        <>
          <div className="absolute top-0 right-0 mt-2 mr-10">
            <span className="font-semibold font-Raleway ">Already have an account ?</span>
            <a
              className="mt-2 mr-64 text-supplair-primary"
              href="/login"
            >
              Log In
            </a>
          </div>
          <div className="flex">
            <SidePage />
            <div className="flex flex-col items-center justify-center w-full h-screen pb-[12vh]">
              <h1 className="mt-20 mb-6 mr-40 text-3xl text-center">Forgot Password</h1>
              <form onSubmit={handleSave}>
                <div className="flex flex-col items-center mt-4">
                  <div className="relative flex items-center mb-5">
                    <FontAwesomeIcon
                      className="absolute ml-3"
                      icon="fa-solid fa-lock"
                    />
                    <input
                      className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                      type="password"
                      placeholder="Password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative flex items-center mb-4">
                    <FontAwesomeIcon
                      className="absolute ml-3"
                      icon="fa-solid fa-lock"
                    />
                    <input
                      className="h-10 py-2 pl-10 border border-gray-300 w-96 rounded-xl focus:outline-none focus:border-supplair-primary focus:border-2"
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      required
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    className="h-10 mt-5 mb-2 text-white w-96 bg-supplair-primary rounded-xl"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1 className="mt-5  ml-5 text-3xl text-left">Reset Your Password</h1>
          <p className="mt-5 m ml-5 text-lg text-left">Sorry,your password reset link expired</p>
        </div>
      )}
    </>
  );
}
