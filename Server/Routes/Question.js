import Question from "../Model/Question.js";
import express from "express";
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;
import filter from "../Middleware/Middleware.js";
router.post("/addQuestion", async (req, res) => {
  console.log("went into adding new question");
  const { languageId, category, description, options, correctAnswer } =
    req.body;
  try {
    const obj = {
      languageId,
      category,
      description,
      options,
      correctAnswer,
    };
    await Question.create(obj);
    res.json({ status: "question added", obj });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// router.get("/getallQuestions", async (req, res) => {
//   try {
//     const all = await Question.find();
//     res.json({ data: all });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get("/getallQuestions", async (req, res) => {
  try {
    console.log("enter into get all questions")
    const { language, category } = req.query;
    const arr = {};
    if (language) {
      arr.languageId = language;
    }
    if (category) {
      arr.category = category;
    }
    console.log(arr);
    const all = await Question.find(arr);
    res.json({ data: all });
     console.log("Data Get successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


router.put("/updateQuestion/:id", async (req, res) => {
  const { id } = req.params;
  const { languageId, category, description, options,  correctAnswer } =
    req.body;
  try {
    const upquestion = await Question.findByIdAndUpdate(
      id,
      { languageId, category, description, options,  correctAnswer },
      { new: true }
    );
    res.json({ status: "updated question", updated: upquestion });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deleteQuestion/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const upquestion = await Question.findByIdAndDelete(id);
    res.json({ status: "deleted question", deleted: upquestion });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getQuestion/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    res.json(question);
  } catch (error) {
    console.log(error);
    res.send("internal Server Error");
  }
});

export default router;
