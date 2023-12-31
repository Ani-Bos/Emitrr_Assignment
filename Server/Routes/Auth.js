import User from "../Model/User.js";
import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET;
import filter from "../Middleware/Middleware.js";
router.post("/createUser", async (req, res) => {
  console.log(`email : ${req.body.email}`);
  let user = null;
  try {
    user = await User.findOne({ email: req.body.email});
    console.log(`user find done`);
    if (user !== null) {
      return res.json({
        status: "user already exists",
        mark: true,
      });
    }
    console.log(`before user create`);
    user = await User.create({
      name: req.body.name || "", 
      email: req.body.email,
    });
    console.log(`after user create`);
    const data = {
      id: user.id,
    };
    console.log(`before jwt sign`);
    const authToken = jwt.sign(data, SECRET_KEY);
    console.log(`authtoken : ${authToken}`);
    res.json({ status: "User added to database", authToken: authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.post("/login", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "please try to login with corrrect credentials" });
    }

    const data = {
      id: user.id,
    };
    const authToken = jwt.sign(data, SECRET_KEY);
    return res.json({ status: "User loggedin", authToken: authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.post("/getuser", filter, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.send("user doesnot exist");
    }
    res.send(user);
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.get('/getalluser', async (req, res) => {
  try {
    const user = await User.find();
    res.send(user)
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error")
  }
})
router.delete("/deleteuser", filter, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).send("Unauthorized");
    }
    user = await User.findByIdAndDelete(req.user.id);
    res.json({ success: "Your account has been deleted", deleteduser: user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.put("/updateuser", filter, async (req, res) => {
  const { email, name, phone, address } = req.body;
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ status: "Unauthorized" });
    }
    const updateduser = await User.findByIdAndUpdate(
      req.user.id,
      {
        email: email ? email : user.email,
        name: name ? name : user.name,
        phone: phone ? phone : user.phone,
        address: address ? address : user.address,
      },
      { new: true }
    );
    res.json({ status: "User info Updated", updatedinfo: updateduser });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error Occured");
  }
});
export default router;
