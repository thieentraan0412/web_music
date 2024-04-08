const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
let refeshTokens =[];

const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //create user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      // save dabase
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  genaratenewaccess: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY_REFESH,
      {
        expiresIn: "365d",
      }
    );
  },
  genarateaccess: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "60s",
      }
    );
  },
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username});
      if (!user) {
        return res.status(404).json("wrong username");
      }
      const validpassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validpassword) {
        res.status(404).json("wrong passsword");
      }
      if (user && validpassword) {
        const accessToken = authController.genarateaccess(user);
        const refeshToken = authController.genaratenewaccess(user);
        refeshTokens.push(refeshToken);
        res.cookie("refeshToken",refeshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          samSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (err) {
      res.status(404).json(err.stack);
      console.log(err.stack);
    }
  },
  logoutUser:async (req,res) =>
  {
    res.clearCookie("refeshToken");
    refeshTokens = refeshTokens.filter((token) => token !== req.cookies.refeshToken);
    res.status(200).json("LOGOUT SUCCESS")
  },
  refeshToken: async (req, res) => {
    const refeshToken = req.cookies.refeshToken;
    if (!refeshToken) {
      res.status(403).json("you are not authencationed");
    } else {
      if(!refeshTokens.includes(refeshToken)){
      res.status(403).json("refesh token is not valid");
      }
      jwt.verify(refeshToken,process.env.JWT_ACCESS_KEY_REFESH, (err, user) => {
        if (err) {
          console.error(err);
        } else {
          refeshTokens= refeshTokens.filter((token)=>token !== refeshToken)
          const newaccessToken = authController.genarateaccess(user);
          const newrefeshToken = authController.genaratenewaccess(user);
          refeshTokens.push(newrefeshToken)
          res.cookie("refeshToken", newrefeshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            samSite: "strict",
          });
          res.status(200).json({newaccessToken});
        }
      });
    }
  },
};
module.exports = authController;
