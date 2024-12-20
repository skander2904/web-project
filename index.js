const express = require("express");
const userRoute = require("./Routes/userRoute");
const connectDb = require("./configuration/DB");
const cors = require("cors"); 
const dotenv = require("dotenv");
const prodcuteRoute=require("./Routes/productRoute")
const purchaseRoute=require("./Routes/purchasesRoute")

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDb();

app.use(cors()); 

app.use(express.json());

app.use("/api", userRoute,prodcuteRoute,purchaseRoute);

app.listen(port, (error) => {
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`server is running on port ${port}`);
  }
});
