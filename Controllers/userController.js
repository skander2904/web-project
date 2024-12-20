

const User = require("../model/user");


const getUsers = async (request, response) => {
try {
const users = await User.find();
if (users && users.length > 0) {
response.status(200).json({ users: users });
} else {
response.status(404).json({ msg: "No users found" });
}
} catch (error) {
console.error(error);
response.status(500).json({ msg: "Error on getting users" });
}

}



const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
  const foundUser = await User.findById(id);
  if (foundUser) {
  res.status(200).json({ user: foundUser });
  } else {
  res.status(404).json({ msg: "No user found with the given ID" });
  }
  } catch (error) {
  res.status(500).json({ msg: "Error on retrieving the user" });
  }
  };

  
  const postUser = async (request, response) => {
  const user = request.body;
  try {
  const foundUser = await User.findOne({ email: user.email });
  if (foundUser) {
  response.status(400).json({ msg: "user already exist" });
  } else {
  const newUser = new User(user)
  console.log(newUser)
  await newUser.save();
  response.status(200).json({ user: newUser, msg: " user successfully added"
  });
  }}
  catch (error) {
  console.error(error);
  response.status(500).json({ msg: "error on adding user" });
  }
  };




  const putUser = async (req, res) => {
    const id=req.params.id;
    const user=req.body
    console.log(user)
    try {
    await User.findByIdAndUpdate(id,user)
    res.status(200).json({ msg: "update success" });
    } catch (error) {
    res.status(500).json({ msg: "error on updating user" });
    }
    };




    const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
    await User.findByIdAndDelete(id)
    res.status(200).json({ msg: "delete done" });
    } catch (error) {
    res.status(500).json({ msg: "error on deleting user" });
    }
    };







const jwt = require("jsonwebtoken");
require('dotenv').config();
const signIn = async (req, res) => {
const user = req.body;
try {
const foundUser = await User.findOne({ email: user.email });
if (foundUser) {
if (user.password === foundUser.password) {
const token = jwt.sign(
{ id: foundUser._id, role: foundUser.role },
process.env.JWT_SECRET
);
res.status(200).json({ user: foundUser, token: token });
} else {
res.status(400).json({ msg: "Wrong password" });
}
} else {
return res.status(400).json({ msg: "User not registered" });
}
} catch (error) {
console.error(error);
res.status(500).json({ msg: "Server error" });
}
};
    module.exports = { getUsers, postUser, putUser, deleteUser, getOneUser,signIn };
