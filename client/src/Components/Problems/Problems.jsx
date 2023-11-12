import { React, useState, useEffect } from "react";
import DashNav from "../DashNav/DashNav";
import { Link ,  useLocation } from "react-router-dom";
import axios from "axios";
const Problems = () => {
     const location = useLocation();
     const queryParams = new URLSearchParams(location.search);
    const language = queryParams.get("language");
    console.log(language)
    const category = queryParams.get("category");
  console.log(category);
  const [des, setDes] = useState("");
  const [op, setOp] = useState([]);
  const [questions, setQuestions] = useState([]);
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
          console.log("des " + des);
          const lastOption = firstQuestion.options[firstQuestion.options.length - 1];
          console.log(lastOption);
          setOp([lastOption]);
          console.log("op " + op);
        }
      }
      catch (error) {
        console.error(error);
      }
    };
     useEffect(() => {
       getProblems();
     }, [language, category]);
    
 return (
   <div>
     <DashNav />
     <div>
       <div className="m-auto">
         <div className="text-dark-blue-s text-2xl font-medium mt-8 text-center">
           Quiz of {language} (Level: {category})
         </div>
         <form className="w-full max-w-sm m-auto">
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
                       <input type="radio" value={value} />
                       <span className="ml-2">{value}</span>
                     </label>
                   )
                 )}
               </div>
             </div>
           ))}
           <div className="flex ml-24 justify-center items-center">
             <div className="w-full max-w-sm mb-4">
               <Link to="/dashboard">
                 <button className="inline-block rounded-md  px-6 outline-1 py-1.5 text-base font-semibold leading-7 text-black shadow-sm ring-1 ring-dark-blue-s bg-white hover:bg-dark-blue-s hover:text-white drop-shadow-sm hover:ring-white">
                   Submit Test
                 </button>
               </Link>
             </div>
           </div>
         </form>
       </div>
     </div>
   </div>
 );
};

export default Problems;
