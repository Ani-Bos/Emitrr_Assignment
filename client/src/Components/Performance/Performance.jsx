import { React, useState, useEffect } from "react";
import DashNav from "../DashNav/DashNav";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const Performance = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [userInfo, setUserInfo] = useState("");
  
  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])
  const [score, setScore] = useState([]);
  const performancegraph = async () => {
    try {
  
         const url = "http://localhost:5000/api/score";
         const response = await axios.post(
           `${url}/performance/${selectedLanguage}`, {},
           {
             headers: {
               "Content-Type": "application/json",
               "auth-token": Cookies.get("auth-Tokensynex"),
             },
           }
         );
         const res = response.data;
         let arr = [];
         for (let i = 1; i <= res.length; i++)
           arr.push(i);
         setLabels(arr)

      let arr1 = res.map((e) => {
        return e.accuracy
      });
      let arr2 = res.map((e) => {
          return e.score;
        });
        let fin2 = await Promise.all(arr2);
        setScore(fin2)
         let fin = await Promise.all(arr1)
         setData(fin)
         
         console.log(fin,arr)
       }
    
     catch (error) {
      console.log(error)
     }
  }
  let categoryData = {
    labels: labels,
    backgroundColor: ["#36A2EB", "#FF6384", "#4CAF50"], 
    borderColor: "rgba(0,0,0,1)",
    borderWidth: 1,
    hoverBackgroundColor: ["#36A2EB", "#FF6384", "#4CAF50"],
    hoverBorderColor: "rgba(0,0,0,1)",

    datasets: [
      {
        data: data,
        label: "performance",
      },
    ],
  };
   let scoreData = {
     labels: labels,

     datasets: [
       {
         data: score,
         label: "Score",
       },
     ],
  };
 
  useEffect(() => {
    performancegraph();
  }, [selectedLanguage])
  
  return (
    <div>
      <DashNav />
      <div className="flex font-medium text-2xl m-auto text-dark-blue-s justify-center items-center">
        {selectedLanguage ? (
          <span>Performance Graph for {selectedLanguage} 🥇</span>
        ) : (
          <span>Performance Graph</span>
        )}
        {/* 🥇 */}
      </div>
      <div className="flex m-auto justify-center items-center">
        <div className="flex flex-wrap -mx-3 mb-6 mt-8">
          <div className="w-full md:w-1/4  px-3 mb-6 md:mb-4 ">
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
                name="languageId"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
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
          <div className="w-full px-3">
            <div className="flex flex-col font-medium text-2xl m-auto text-dark-blue-s justify-center items-center">
              <span>Accuracy Graph 🎯</span>
            </div>
            <div className="max-w-xl">
              <Line data={categoryData}> </Line>
            </div>
            <div className="flex flex-col font-medium text-2xl m-auto text-dark-blue-s justify-center items-center">
              <span>Score Graph 🎯</span>
            </div>
            <div className="max-w-xl">
              <Bar data={scoreData}> </Bar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
