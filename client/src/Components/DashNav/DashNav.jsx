import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Avatar from "react-avatar";
import axios from "axios";
import { Link } from "react-router-dom";

const DashNav = () => {
  const [name, setName] = useState("");
    const getuserinfo = async () => {
      const url = "http://localhost:5000/api/auth";
    const user = await axios.post(
      `${url}/getuser`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": Cookies.get("auth-Tokensynex"),
        },
      }
    );
      const data = user.data;
      console.log(data);
      console.log("email" + data.email)
      const ee = data.email
      setName(ee[0]);
      console.log(name)
  };

  useEffect(() => {
    if (!Cookies.get("auth-Tokensynex")) {
      navigate("/login");
      return;
    }
    getuserinfo()
  }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

   const [navbar, setNavbar] = useState(false);

  let navigate = useNavigate();
    return (
      <div>
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
                <ul className="items-center justify-center space-y-8 mb-3 md:flex md:space-x-6 md:space-y-0 ">
                  <li className="p-2 space-x-8 text-gray-800 h-10  rounded-md hover:text-dark-blue-s hover:font-bold">
                    <Link to="/test">Test</Link>
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
                  <li>{/* bg-[#002A8E] */}</li>
                  <li className="p-2 space-x-8">
                    {/* <div
                      style={{
                        borderRadius: "50%",
                        overflow: "hidden",
                        width: "10vw",
                        maxWidth: "50px",
                      }}
                    >
                      <Avatar name={name} size={50} />
                    </div> */}

                    <div className="relative">
                      <button
                        type="button"
                        className=""
                        aria-expanded={isProfileOpen}
                        onClick={handleProfileToggle}
                      >
                        <span className="sr-only">Open user menu</span>
                        <div
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                            width: "10vw",
                            maxWidth: "50px",
                          }}
                        >
                          <Avatar name={name} size={50} />
                        </div>
                      </button>

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48  bg-white divide-y divide-gray-100 rounded shadow dark:bg-dark-blue-s dark:divide-dark-blue-s">
                          <ul className="py-1" role="none">
                            <li>
                              <button
                                onClick={() => {
                                  Cookies.remove("email");
                                  Cookies.remove("auth-Tokensynex");
                                  Cookies.remove("name");
                                  Cookies.remove("email");
                                  // logout();
                                  navigate("/");
                                }}
                                className="px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-white dark:hover:bg-white dark:hover:text-black"
                                role="menuitem"
                              >
                                Log out
                              </button>
                            </li>
                            
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default DashNav;
