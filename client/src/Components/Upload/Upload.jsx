import { React, useState , useEffect } from "react";
import DashNav from '../DashNav/DashNav';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Upload = () => {
  const [langvalue, setLangvalue] = useState("");
  const [categoryvalue, setCategoryvalue] = useState("");
  const [descriptionvalue, setDescriptionvalue] = useState("");
  const [op1, setOp1] = useState("");
  const [op2, setOp2] = useState("");
  const [op3, setOp3] = useState("");
  const [op4, setOp4] = useState("");
  const [optionsvalue, setOptionsvalue] = useState([]); 
  const [answervalue, setAnswervalue] = useState("");
  const [updone, setUpdone] = useState(false)
  // optionsvalue.push({ op1, op2, op3, op4 });
  const handleUpload = async () => {
    try {
        const requestData = {
          languageId: langvalue,
          category: categoryvalue,
          description: descriptionvalue,
          options: [{ op1, op2, op3, op4 }],
          correctAnswer: answervalue,
        };
      console.log("Request Data:", requestData);
        console.log(langvalue);
        console.log(categoryvalue);
        console.log(descriptionvalue);
        console.log(answervalue);
        console.log(optionsvalue);
          console.log("hoii");
          const url = "http://localhost:5000/api/question";
          const resp = await axios.post(`${url}/addQuestion`, requestData);
          const res = resp.data;
        // console.log(await res.json());
      console.log(res);
      setOptionsvalue([{ op1, op2, op3, op4 }]);
      setUpdone(true);
    } catch (error) {
      if (error) {
        console.log(error);
         toast.error("Error submitting the question. Please try again.");
       }
    }
  }
   const showToastMessage = () => {
     if (updone===true) {
       toast.success("Question Submitted Succesfully !", {
         position: toast.POSITION.TOP_RIGHT,
       });
     }
     else {
       toast.error("Unable to upload!", {
         position: toast.POSITION.TOP_RIGHT,
       });
     }
   };
  return (
    <div>
      <DashNav />
      <div className="m-auto">
        <form className="w-full max-w-lg m-auto ">
          <div className="flex flex-col">
            <span className="text-dark-blue-s text-xl font-medium mb-2 m-auto text-center">
              Upload your Questions
            </span>
            <div className="flex flex-wrap -mx-3 mb-6 mt-8">
              <div className="w-full md:w-1/2  px-3 mb-6 md:mb-4 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Language
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name=" languageId"
                    value={langvalue}
                    onChange={(e) => setLangvalue(e.target.value)}
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bengali</option>
                    <option>Spanish</option>
                    <option>French</option>
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
              <div className="w-full md:w-1/2  px-3 mb-2 md:mb-4 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name=" category"
                    value={categoryvalue}
                    onChange={(e) => setCategoryvalue(e.target.value)}
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
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
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Question Description
                </label>
                <textarea
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="description"
                  value={descriptionvalue}
                  onChange={(e) => setDescriptionvalue(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Option 1"
                >
                  Option 1
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Option 1"
                  value={op1}
                  onChange={(e) => setOp1(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Option 2"
                >
                  Option 2
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Option 2"
                  value={op2}
                  onChange={(e) => setOp2(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Option 3"
                >
                  Option 3
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="Option 3"
                  value={op3}
                  onChange={(e) => setOp3(e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Option 4"
                >
                  Option 4
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="Option 4"
                  value={op4}
                  onChange={(e) => setOp4(e.target.value)}
                />
              </div>

              <div className="flex m-auto justify-evenly ">
                <div className="w-full md:w-3/4  px-3 mb-6 md:mb-4 ">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-4"
                    htmlFor="grid-state"
                  >
                    Correct Answer
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      value={answervalue}
                      onChange={(e) => {
                        setAnswervalue(e.target.value);
                      }}
                    >
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                      <option>Option 4</option>
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
                <div className="w-full md:w-1/2 px-3  p-auto mt-10 md:mb-0">
                  <Link to="/dashboard">
                    <button
                      className="rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white"
                      onClick={() => {
                        handleUpload();
                        // showToastMessage(); 
                      }}
                    >
                      Upload
                    </button>
                    {/* <ToastContainer /> */}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;