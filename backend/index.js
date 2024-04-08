const express = require('express')
const app = express()
const cors =  require('cors')
const cookieParser =  require("cookie-parser")
const bodyParser = require('body-parser')
const dotenv =  require("dotenv")
const  mongoose  = require('mongoose')
const port = 8000
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//connect
async function connect()
{
    try {
        await mongoose.connect("mongodb://localhost:27017/")
        console.log("connected in mongdb")
      } catch (error) {
        console.log("ko ket noi duoc");
      }
}
connect();

const authroute = require("./routes/auth")
const userroute = require("./routes/user")
const ZingMp3Router = require("./routes/ZingRouter")
app.use("/v1/auth",authroute)
app.use("/v1/user",userroute)
app.use("/api", cors({ origin: '*' }), ZingMp3Router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})