const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const userRouter = require("./Routes/userRoutes");
const noteRouter = require("./Routes/noteRoutes");

const cors = require("cors");


const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/note",noteRouter)
app.use("/users",userRouter)

app.get("/",(req,res) => {
    res.send("Note's API By Gopal");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("server started on port no. "+PORT);
    });
}).catch((error)=>{
    console.log(error);
})
