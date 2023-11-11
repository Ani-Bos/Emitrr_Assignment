import React from "react";
const Footer = () => {
  return (
    <div>
      <footer className="">
        <div className="w-full ">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <h3 className="mb-6  font-semibold  uppercase text-black">
                Company
              </h3>
              <ul className="text-black dark:text-black">
                <li className="mb-2">
                  <a href="/" className=" hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Brand Center
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6  font-semibold text-black uppercase ">
                Help center
              </h3>
              <ul className="text-black dark:text-black">
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Discord Server
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li className="mb-3">
                  <a href="/" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6  font-semibold text-black uppercase ">
                Legal
              </h3>
              <ul className="text-black dark:text-black">
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>

                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 font-semibold text-black uppercase ">
                Use Case
              </h3>
              <ul className="text-black dark:text-black">
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Holidays & weekends
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Shared house
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    Bachelor party
                  </a>
                </li>
                <li className="mb-2">
                  <a href="/" className="hover:underline">
                    other
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center  mt-6">
            <a
              href="/"
              className="flex items-center justify-center mb-5 text-2xl font-semibold  text-black"
            >
              QuizLingo
            </a>
            <span className="block pb-6 text-sm text-center text-black dark:text-black">
              © 2023 QuizLingo™. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
