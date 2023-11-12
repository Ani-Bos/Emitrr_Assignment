import React, { useState } from "react";
import DashNav from "../DashNav/DashNav";
import { Link } from "react-router-dom";

const Test = () => {
  const [typo, setTypo] = useState({ language: "", category: "" });

  const handleLanguageChange = (event) => {
    setTypo({ ...typo, language: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setTypo({ ...typo, category: event.target.value });
  };
  console.log(typo.language)
  console.log(typo.category);
  return (
    <div>
      <DashNav />
      <div>
        <div className="m-auto">
          <form className="w-full max-w-lg m-auto  ">
            <div className="flex flex-col  p-auto rounded-lg border mt-4 mb-4 bg-[#a6ebfb]">
              <span className="text-gray-700 text-xl font-medium  mt-8 text-center">
                Interesting Lingo Quiz
              </span>
              <div className="flex flex-col -mx-3 mb-6 mt-8">
                <div className="flex m-auto justify-center items-center">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Language
                  </label>
                  <div className="w-full  px-3 mb-6 md:mb-4 ">
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        onChange={handleLanguageChange}
                        value={typo.language}
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex m-auto justify-center items-center">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-state"
                  >
                    Category
                  </label>
                  <div className="px-3 mb-6 md:mb-4 ">
                    <div className="relative">
                      <select
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        onChange={handleCategoryChange}
                        value={typo.category}
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex m-auto items-center justify-center">
                  <div className="w-full   px-3 mb-2 md:mb-4">
                    <Link to={`/problems?language=${typo.language}&category=${typo.category}`}>
                      <button className="rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white">
                        Take Quiz
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test;
