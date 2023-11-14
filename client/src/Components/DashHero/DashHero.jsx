import { React, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const DashHero = () => {
  let navigate = useNavigate();
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
      console.log("email" + data.email);
      let x = data.email.split("@");
    setName(data.name);
    console.log(name);
  };

  useEffect(() => {
    if (!Cookies.get("auth-Tokensynex")) {
      navigate("/login");
      return;
    }
    getuserinfo();
  }, []);
  return (
    <div>
      <section className="">
        <div className="px-6 py-12 lg:my-0 md:px-12 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="lg:flex justify-between items-center  sm:flex-row">
              <div className="my-10">
                <h3 className="text-2xl md:text-3xl xl:text-5xl font-bold tracking-tight text-gray-600 mb-4">
                  Hi {name} !{" "}
                </h3>
                <h4>
                  {" "}
                  <span className="text-dark-blue-s text-3xl font-medium ">
                    <span>Welcome to LingoQuiz</span>
                  </span>
                </h4>
                <p class="max-w-2xl mt-4 font-normal text-gray-600 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-600">
                  Enhance your linguistic abilities with funny and interesting
                  quizzes. Review your scores and compete with others 🎉
                </p>
              </div>
              <div className="grid place-items-center ">
                <img
                  className=" w-96 h-96"
                  src="Images/her.svg"
                  alt="React Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashHero;
