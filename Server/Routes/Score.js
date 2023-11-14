import User from "../Model/User.js";
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
const SECRET_KEY = "Lingo";
import filter from "../Middleware/Middleware.js";
import Rank from "../Model/Ranks.js";
router.post("/getscore", filter, async (req, res) => {
  try {
    console.log("calculating score");
    const { category, language, answer } = req.body;
    console.log("category" + category);
    console.log("language" + language);
    console.log("answer" + answer);
    let score = 0,
      totalScore = 0;
    if (category === "Easy") {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === true) {
          score += 1;
        }
      }
      totalScore = answer.length;
    } else if (category === "Medium") {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === true) {
          score += 3;
        }
      }
      totalScore = 3 * answer.length;
    } else {
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === true) {
          score += 5;
        }
      }
      totalScore = 5 * answer.length;
    }
    let percentage = (score / totalScore) * 100;
    console.log({ score, percentage });
    console.log("Score calculated succesfully");
    // let user = await User.findById(req.user.id);
    const userId = req.user.id; 
    console.log(userId);

    let currentp = await User.findById(userId);
    let allscore = currentp.score
    allscore[language][category] = allscore[language][category] + score;
    console.log(allscore)
    let totalgame = currentp.gameplayed;
    totalgame[language][category] = totalgame[language][category]+1;

     await User.findByIdAndUpdate(userId, { score:allscore,gameplayed:totalgame});
     
     await Rank.create({ user_id: userId, language_id: language, score: score, accuracy: percentage })
     console.log("Score calculated successfully");
      res.status(200).json({ score, percentage });
    // res.send("operation done")
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/leader/:lang_id", filter, async (req, res) => {
   let lang_id = req.params.lang_id;
  try {
    console.log(lang_id)
    console.log("entered into leader");
    const leaderboard = await Rank.find({ language_id: lang_id })
      .populate("user_id", "name email")
      .select("score")
      .sort({ score: -1 });
    const leaderboardArray = leaderboard.map((e) => ({
      uid: e.user_id,
      name: e.name,
      score: e.score,
    }));
    const jsonContent = JSON.stringify(leaderboardArray);
    console.log(jsonContent)
    res.status(200).send(jsonContent);
    // const { language } = req.query;
    //  console.log("entered into leader");
    //  const { language } = req.query;
    //  const users = await User.find({ language: language })
    //    .select("user.id name email score percentage") 
    //    .sort({ score: -1 });
    //  res.status(200).json(users);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/performance/:lang_id",filter, async (req, res) => {
let userId=req.user.id
  try {
    console.log("enter performance")
    const arr = await Rank.find({
      user_id: userId,
      language_id: req.params.lang_id,
    })
      .sort({ createdAt: 1 });
    console.log(arr)
  
    res.status(200).send(arr);
  } catch (error) {
    console.log(error);
  }
})
export default router;