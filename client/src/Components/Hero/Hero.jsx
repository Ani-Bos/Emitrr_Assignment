import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div>
      <section className="">
        <div className="px-6 py-12 lg:my-0 md:px-12 text-gray-800 text-center lg:text-left">
          <div className="container mx-auto xl:px-32">
            <div className="lg:flex justify-between items-center  sm:flex-row">
              <div className="my-10">
                <h3 className="text-2xl md:text-3xl xl:text-5xl font-bold tracking-tight text-gray-600 mb-16">
                  Check your Lingo Skills
                  {/* <span className="text-primary">among</span> */}
                  <span className="text-dark-blue-s ">
                    <Typewriter
                      options={{
                        autoStart: true,
                        loop: true,
                        delay: 100,
                        strings: ["Believe", "Act", "Results"],
                      }}
                    />
                  </span>
                </h3>
                <p class="max-w-2xl mt-4 font-normal text-gray-600 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-600">
                 Empowering Seekers of Treasure
                </p>
                {/* <a
                  href="/login"
                  className="items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center bg-primary text-gray-500 hover:bg-transparent hover:outline rounded-lg"
                >
                  Get started
                </a> */}
                <Link
                  to="/login"
                  class="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white"
                >
                  Get Started
                </Link>
              </div>
              <div className="grid place-items-center ">
                <img
                  className=" rounded-full w-96 h-96"
                  src="Images/im1.png"
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

export default Hero;
