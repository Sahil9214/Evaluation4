const express = require("express");
const { connection } = require("./db");
const {auth} = require("./middleware/auth.middleware");
const { userRouter } = require("./routes/User.routes");
const { PostRouter } = require("./routes/Post.routes");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use("/users", userRouter);
app.use(auth)
app.use('/posts',PostRouter)
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Port is running");
  } catch (err) {
    console.log("Port is not running");
  }
});
