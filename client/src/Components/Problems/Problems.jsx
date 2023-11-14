import { React, useState, useEffect } from "react";
import DashNav from "../DashNav/DashNav";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Successful from "./Successful"; 
import Cookies from "js-cookie";
import axios from "axios";
const Problems = () => {
  let navigate = useNavigate();
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get("language");
    console.log(language)
    const category = queryParams.get("category");
  console.log(category);
  const [des, setDes] = useState("");
  const [op, setOp] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctans, setCorrectans] = useState([]);
  const [check, setCheck] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [scoreData, setScoreData] = useState({});
  const [notclose, setNotclose] = useState(false)
    const getProblems = async () => {
      try {
        const url = "http://localhost:5000/api/question";
        const resp = await axios.get(`${url}/getallQuestions`, {
          params: { language, category },
        });
        const res = resp.data;
        console.log(res.data);
         if (res.data && res.data.length > 0) {
           setQuestions(res.data);
         }
        if (res.data && res.data.length > 0) {
          const firstQuestion = res.data[0];
          console.log(firstQuestion.description);
          setDes(firstQuestion.description);
          // console.log("des " + des);
          const lastOption = firstQuestion.options[firstQuestion.options.length - 1];
          console.log(lastOption);
          setOp([lastOption]);
          // console.log("op " + op);
           const correctAnswers = res.data.map((question) => {
             return question.correctAnswer;
           });
          console.log("correctAnswers"+correctAnswers);
           setCorrectans(correctAnswers);
          console.log("correctans" + correctans);
          setCheck(Array(res.data.length).fill(false));
        }
      }
      catch (error) {
        console.error(error);
      }
    };
  useEffect(() => {
       getProblems();
  }, [language, category]);

  useEffect(() => {
      let newCheck = selectedOptions.map(
        (selected, index) => selected === correctans[index]
      );
      setCheck(newCheck);
      console.log("check", newCheck);
  }, [selectedOptions, correctans]);
  
 const handleOptionSelect = (questionIndex, optionIndex, value) => {
   const updatedSelectedOptions = [...selectedOptions];
   updatedSelectedOptions[questionIndex] = `Option ${optionIndex + 1}`;
   setSelectedOptions(updatedSelectedOptions);
   console.log("selectedoptions", updatedSelectedOptions);
 };

  const handleSubmission = async () => {
    try {
      const requestData = {
        language: language,
        category: category,
        answer: check,
      };

      console.log("req.lang" + language);
      console.log("req.cat" + category);
      console.log("req.check" + check);

      const url = "http://localhost:5000/api/score";
      const resp = await axios.post(`${url}/getscore`, requestData, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": Cookies.get("auth-Tokensynex"),
        },
      });
      
      const res = resp.data;
      console.log(res);
      console.log("res.score"+res.score)
       console.log("res.score"+res.percentage);
      setScoreData(res); 
      setShowModal(true); 
      setNotclose(true)
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //    if (showModal) {
  //      handleSubmission();
  //    }
  // }, [])
  
    const closeModal = () => {
      setShowModal(false);
      navigate('/dashboard')
    };
 return (
   <div>
     <DashNav />
     <div>
       {!notclose && (
         <div className="m-auto">
           <div className="text-dark-blue-s text-2xl font-medium mt-8 text-center">
             Quiz of {language} (Level: {category})
           </div>
           <div className="w-full max-w-sm m-auto">
             {questions.map((question, index) => (
               <div
                 key={index}
                 className="flex flex-col p-auto rounded-lg border mt-4 mb-4 bg-gray-600"
               >
                 <div className="question ml-4 mt-4">
                   <p className="text-white">
                     {index + 1}. {question.description}
                   </p>
                 </div>
                 <div className="options flex flex-col">
                   {Object.entries(question.options[0]).map(
                     ([key, value], optionIndex) => (
                       <label
                         key={optionIndex}
                         className="text-white ml-4 mt-2 mb-2"
                       >
                         <input
                           type="radio"
                           name={`question_${index}`}
                           value={value}
                           onChange={() =>
                             handleOptionSelect(index, optionIndex, value)
                           }
                         />
                         <span className="ml-2">{value}</span>
                       </label>
                     )
                   )}
                 </div>
               </div>
             ))}
             <div className="flex ml-24 justify-center items-center">
               <div className="w-full max-w-sm mb-4">
                 {/* <Link to="/successful"> */}
                 <button
                   className="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white"
                   onClick={handleSubmission}
                 >
                   Submit Test
                 </button>
                 {/* </Link> */}
               </div>
             </div>
           </div>
         </div>
       )}
     </div>
     {showModal && notclose && (
       <div className="modal">
         <div className=" flex m-auto p-8 rounded-xl bg-gray-200 w-sm max-w-sm">
           <span className="close p-auto pl-2 pr-2 bg-blue-500 w-6 h-6"  onClick={closeModal}>
             &times;
           </span>
           <div className="flex flex-col m-auto">
             <span className="flex font-medium text-xl m-auto text-dark-blue-s justify-center items-center">
               LingoQuiz Results 🙌
             </span>
             <span className="flex font-normal text-xl text-gray-800 m-auto justify-center items-center">
               Total Marks Scored: {scoreData.score}
             </span>

             <span className="flex font-normal  text-xl m-auto text-gray-800 justify-center items-center">
               Accuracy 🎯: {scoreData.percentage}%
             </span>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default Problems;
