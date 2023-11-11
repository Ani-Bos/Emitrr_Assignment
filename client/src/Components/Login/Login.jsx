import React, { useState } from "react";
import { Link, useNavigate, navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Login = ({props}) => {
  let navigate = useNavigate();

  const [credential, setCredential] = useState({ email: "", password: "" });
  const handleSignIn = async () => {
     const url = "http://localhost:5000/api/auth";
     const resp = await axios.post(`${url}/login`, { email: credential.email });
     const res = resp.data;
     Cookies.set("auth-Tokensynex", res.authToken);
     navigate("/dashboard");
  };
  const handleSign = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  return (
    <section className="absolute w-full h-full">
      <div className="absolute top-0 w-full h-full  bg-[#d8e8ff]"></div>
      <div className="container mx-auto px-4 h-full mt-3 ">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div
              className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              style={{
                background: "#ffffff",
              }}
            >
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-1">
                  <h6 className="text-gray-800 text-regular text-xl font-medium">
                    Login to your account
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {/* <div className="text-white text-center mb-3 font-regualar">
                    <small>Sign in with Email 📧</small>
                  </div> */}
                <form>
                  <div className="relative w-full mb-3 mt-1">
                    <p>Email</p>
                    <input
                      value={credential.email}
                      onChange={handleSign}
                      type="email"
                      name="email"
                      className="border-0 px-3 py-3 placeholder-gray-800 text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Email"
                      style={{
                        background: "#ffffff",
                        border: "1px solid black",
                      }}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-1">
                    <p>Password</p>
                    <input
                      value={credential.password}
                      onChange={handleSign}
                      type="password"
                      name="password"
                      className="border-0 px-3 py-3 placeholder-gray-800  text-black bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Password"
                      style={{
                        background: "#ffffff",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer mt-2">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-white ml-1 w-5 h-5 "
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-regualar text-black">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      disabled={
                        credential.email === "" || credential.password === ""
                          ? true
                          : false
                      }
                      onClick={handleSignIn}
                      className={`${
                        credential.email === "" || credential.password === ""
                          ? "bg-dark-blue-s"
                          : "bg-dark-blue-s"
                      }
                       text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full `}
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div>
                  {/* {error && (
                                        <div className="text-red-500 text-sm">{error}</div>
                                    )} */}
                </div>
              </div>
              <div className="px-5 py-2 text-regular flex text-center justify-center items-center  text-black">
                <p>New to myApp?</p>
                <Link to="/" className="text-[#1E4D91] mx-2">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
