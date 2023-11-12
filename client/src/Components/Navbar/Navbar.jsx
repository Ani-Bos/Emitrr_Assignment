import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
const Navbar = () => {
  let navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  return (
    <nav className="w-full">
      <div className="justify-between px-4 mx-auto lg:max-w-8xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/">
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold tracking-tight text-dark-blue-s">
                Quiz<span className="text-gray-600 ">Lingo</span>
              </h1>
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {/* navbar == true -> display the nav links and so cross icon is shown to close them */}
                {navbar ? (
                  <img
                    h-2
                    src="./images/maki_cross.svg"
                    alt="hamburger-1"
                  ></img>
                ) : (
                  <img src="./images/hamburger.svg" alt="hamburger-2"></img>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            // className={navbar ? "hidden" : "block"}
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center space-y-8 mb-3 md:flex md:space-x-6 md:space-y-0">
              {!Cookies.get("auth-Tokensynex") ? (
                <>
                  <li className="p-2 space-x-8 text-gray-800 h-10  rounded-md hover:text-dark-blue-s hover:font-bold">
                    <Link to="/signup">Test</Link>
                  </li>
                  <li className="p-2 text-gray-800 h-10 hover:text-dark-blue-s hover:font-bold">
                    <Link to="/signup">Performance</Link>
                  </li>
                  <li className="p-2 text-gray-800 h-10 hover:text-dark-blue-s hover:font-bold">
                    <Link to="/signup">Leaderboard</Link>
                  </li>
                  <li className="p-2 space-x-8 text-gray-800  h-10 hover:text-dark-blue-s hover:font-bold">
                    <Link to="/signup">Upload Question</Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="p-2 space-x-8 text-gray-800 h-10  rounded-md hover:text-dark-blue-s hover:font-bold">
                    <Link to="/Test">Test</Link>
                  </li>
                  <li className="p-2 text-gray-800 h-10 hover:text-dark-blue-s hover:font-bold">
                    <Link to="/performance">Performance</Link>
                  </li>
                  <li className="p-2 text-gray-800 h-10 hover:text-dark-blue-s hover:font-bold">
                    <Link to="/leaderboard">Leaderboard</Link>
                  </li>
                  <li className="p-2 space-x-8 text-gray-800  h-10 hover:text-dark-blue-s hover:font-bold">
                    <Link to="/upload">Upload Question</Link>
                  </li>
                  <li>
                    <Link to="/dashboard">
                      <button className="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white">
                        Dashboard
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
