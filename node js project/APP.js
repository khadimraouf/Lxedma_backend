const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Article = require("./models/article")
app.use(express.json())

mongoose.connect("mongodb+srv://rio:rio@cluster0.uksinpa.mongodb.net/?appName=Cluster0")
.then(()=>{
  console.log("Great sucsuss")
}).catch(()=>{
  console.log("erroroD")
})
// mongodb+srv://rio:<db_password>@cluster0.uksinpa.mongodb.net/?appName=Cluster0
//mongodb+srv://rio:<db_password>@cluster0.uksinpa.mongodb.net/?appName=Cluster0


app.get("/hello",(req,res)=>{
    // res.sendFile(__dirname + "/views/numbers.html")
    let numbers = ""
    for(let i=0;i<100;i++){
      numbers += i+"-";
    }
    res.render("numbers.ejs",{
      name:"crack",
      numbers: numbers,
    })
  })

app.post("/addComment",(req,res)=>{
    res.send("BOYYY u posting !!")
})

app.get("/saySUM",(req,res)=>{
    // res.send(`hello ${req.body.name} age?${req.query.age}`)
    res.json({
      name: req.body.name,
      age: req.query.age,
    })
})
//===== END PIONTS ======
app.post("/articles",async (req,res)=>{
  const newArticle = new Article()
  const A = req.body.diftitle
  const B = req.body.difbody
  newArticle.title=A
  newArticle.body=B
  newArticle.numberOfLikes=34
  await newArticle.save()
  res.json(newArticle)
})

app.get("/articles/:articlid",async (req,res)=>{
  const id = req.params.articlid
  const article = await Article.findById(id)
  res.json(article)
  //
})

app.get("/show", async (req,res)=>{
  const articles = await Article.find()
  res.render("articles.ejs",{
    allarticles: articles
  })
})

app.listen(5000,()=>{
  console.log("i know what kind of man u are ")
})