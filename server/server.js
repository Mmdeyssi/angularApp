const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;


// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

// GET route - Allows to get all the items
// example: localhost:3000/clothes?page=0&perPage=2
app.get('/clothes', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const perPage = parseInt(req.query.perPage) || 10;

  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    const jsonData = JSON.parse(data);

    const start = page * perPage;
    const end = start + perPage;

    const result = jsonData.items.slice(start, end);

    res.status(200).json({
      items: result,
      total: jsonData.items.length,
      page,
      perPage,
      totalPages: Math.ceil(jsonData.items.length / perPage),
    });
  });
});
app.post("/clothes", (req,res)=>{
  const {name,price,rating,image}=req.body;
  fs.readFile("db.json","utf8",(err,data)=>{
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData=JSON.parse(data);
    const maxId=jsonData.items.reduce((max,item)=>Math.max((max,item.id),0));

    const newItem = {
      id:maxId + 1,
      name,
      price,
      rating,
      image,
    }
    jsonData.items.push(newItem);
    fs.writeFile("db.json",JSON.stringify(jsonData),(err)=>{
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(201).json(newItem);  
    })
  })
})
app.put("/clothes/:id", (req,res)=>{
  const id = parseInt(req.params.id);
  const {name,price,rating,image}=req.body;
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData = JSON.parse(data);
    const index = jsonData.items.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }
    jsonData.items[index] = {
      id,
      name,
      price,
      rating,
      image
    };

    
    fs.writeFile("db.json",JSON.stringify(jsonData),(err)=>{
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(204).send();  
    })

  })

})
app.delete("/clothes/:id",(req,res)=>
{
  const id = parseInt(req.params.id);
  fs.readFile("db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
      return;
    }
    const jsonData = JSON.parse(data);
    const index = jsonData.items.findIndex((item) => item.id === id);
    if (index === -1) {
      res.status(404).send("Not Found");
      return;
    }
    jsonData.items.splice(index, 1);
    fs.writeFile("db.json",JSON.stringify(jsonData),(err)=>{
      if(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.status(204).send();
    });

  })
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
