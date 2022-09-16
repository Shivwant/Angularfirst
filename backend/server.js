const {MongoClient, ObjectId}=require('mongodb');
const url="mongodb://localhost:27017";

const Client=new MongoClient(url);
const dbo=Client.db('Heroes');

const express = require('express')
const cors=require("cors");
const app = express()
const port = 3000
const collection="Lists";

app.use(cors({
  origin:"http://localhost:4200"
}))
app.use(express.json());
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get('/api/heros', (req, res) => {
  const ress=dbo.collection(collection).find().toArray();
  ress.then((data)=>{
    res.status(200).send(data);
  })
})

app.get('/api/heros/:id', (req, res) => {
  const id1=req.params.id
  const ress=dbo.collection(collection).findOne({_id:ObjectId(`${id1}`)});
  ress.then((data)=>{
    res.status(200).send(data);
  })
})

app.post('/api/heros', (req, res) => {
  const hero={
    name:req.body.name,
    id:req.body.id
  }
  dbo.collection(collection).insertOne(hero)
  res.send(hero)
})

app.put('/api/heros/:id' , (req,res)=>
{
  const id=req.params.id;
  const hero={
    name:req.body.name
  }
  const ress=dbo.collection(collection).findOneAndUpdate({_id:ObjectId(`${id}`)},{$set:{"name":`${hero.name}`}})
  ress.then((data)=>{
    res.status(200).send(data);
  })
})

app.delete('/api/heros/:id',(req,res)=>
{
  const id1=req.params.id
  console.log(id1);
  const ress=dbo.collection(collection).findOneAndDelete({_id:ObjectId(`${id1}`)});
  ress.then((data)=>{
    res.status(200).send(data);
  })})
