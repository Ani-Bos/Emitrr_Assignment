import { React, useState, useEffect } from "react";
import DashNav from "../DashNav/DashNav";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const Leaderboard = () => {
  const [rank, setRank] = useState([])
  let cmp = (a,b) => {
    if (a['score'] > b['score'])
      return -1;
    else if (a["score"] === b["score"]) return 0;
    else return 1;
  }
  const [selectedLanguage, setSelectedLanguage] = useState("English");

   const getRanks = async  () => {
      try {
          const url = "http://localhost:5000/api/auth";
         const resp = await axios.get(
           `${url}/getalluser`,
           {
      
             headers: {
               "Content-Type": "application/json",
             },
           }
         );
        const res = resp.data;
        
        console.log(res)
        

        
        let scores = res.map((e) => {
         let totalSum = 0;

          // Loop through each language
          for (const language in e['score']) {
            // Loop through each difficulty level for the language
            for (const difficulty in e['score'][language]) {
              // Add the score to the total sum
              totalSum += e['score'][language][difficulty];
            }
          }
          let newobj = {
            name: e.name,
            email: e.email,
            score:totalSum
          }
          return newobj
        })
        let finalscore = await Promise.all(scores)
        finalscore.sort(cmp)
        console.log(finalscore)
        setRank(finalscore)
      } catch (error) {
        console.log(error)
      }
    }
  useEffect(() => {
    getRanks();
  },[])
    return (
      <div>
        <DashNav />
        <div className="flex font-medium text-2xl m-auto text-dark-blue-s justify-center items-center">
          {/* <span>Leaderboard for {selectedLanguage}👑</span> */}
          {selectedLanguage ? (
            <span>Leaderboard for {selectedLanguage} 👑</span>
          ) : (
            <span>Leaderboard</span>
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
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-900 dark:text-gray-900">
                  <thead class="text-xs text-gray-900 uppercase dark:bg-dark-blue-s dark:text-white">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Rank
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rank.length === 0 ? (
                      <span>No data to show</span>
                    ) : (
                        rank.map((user, index) => {
                          return (
                        
                            <tr
                              key={user._id}
                              className="bg-white dark:bg-[#d3dde8] dark:border-dark-blue-s"
                            >
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                {user.name}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900">
                                {user.score}
                              </td>
                            </tr>
                          )
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Leaderboard;
