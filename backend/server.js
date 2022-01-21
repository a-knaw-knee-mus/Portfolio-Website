const mongoose = require("mongoose")
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()
const app = express()

mongoose.connect(`${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connected to Mongoose")
})

const Project = require("./models/project")
const Home = require("./models/home")

const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
}

app.use(express.json())
app.use(cors({origin: "https://muhammadmehdi-ali.netlify.app", credentials: true, config}))
app.set("trust proxy", 1)
app.use(express.urlencoded({extended:false}))

//middleware to prevent POST requests with Postman
function auth(req, res, next) {
    if(req.body.apiKey === process.env.API_KEY) next() 
    else res.send("Can't make POST requests")
}

app.get("/gethomecontent", (req, res) => {
    Home.find({}, (err, docs) => {
        if(!err) {
            res.send(docs[0])
        } else {
            throw err
        }
    })
})

app.post("/edithomecontent", auth, async (req, res) => {
    const editHome = {
        intro: req.body.intro,
        profilePic: req.body.pfp,
        resume: req.body.resume
    }

    await Home.findOneAndUpdate({_id: req.body.id}, editHome, {returnOriginal: false})
    res.sendStatus(202)
})

app.post("/addproject", auth, async (req, res) => {
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image,
        demo: req.body.demo
    })
    await newProject.save()
    res.sendStatus(202)
})

app.post("/editproject", auth, async (req, res) => {
    const editProject = {
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        image: req.body.image,
        demo: req.body.demo
    }
    await Project.findOneAndUpdate({_id: req.body.id}, editProject, {returnOriginal: false})
    res.sendStatus(202)
})

app.post("/deleteproject", auth, async (req, res) => {
    await Project.deleteOne({_id: req.body.id})
    res.sendStatus(200)
})

app.get("/getprojects", (req, res) => {
    Project.find({}, (err, docs) => {
        if(!err){
            res.send(docs)
        } else {
            throw err
        }
    })
})

app.get("/", (req, res) => {
    res.send("RUNNING ON 4000")
})

app.listen(process.env.PORT || 4000, () => {
    console.log("server started")
})