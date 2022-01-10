const express = require('express');
var app = express();

app.use(express.json());

const { MongoClient } = require('mongodb');

// URL
const url = 'mongodb+srv://doan:odlW8VRBSvWxbnOT@data.2dbpw.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Database Name
const dbName = 'DoAn';


async function Connect() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    return "Done."
}

Connect()
  .then(console.log)
  .catch(console.error);

async function GetDataByCollection(collectionName){
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    let findResult = await collection.find({}).toArray();
    return findResult;
}

async function AddDataByCollection(collectionName, jsonData){
    
}

const PORT =  process.env.PORT ||3003;

app.get("/index", async(req,res) => {
    if(req.query == "") return res.json(); ;
    let dataRes;

    if(req.query.page == "home"){
        dataRes = await GetDataByCollection("moviedb");
        return res.json(dataRes);
    }        

    if(req.query.page == "theloai"){
        dataRes = await GetDataByCollection("types");
        return res.json(dataRes[0]);
    }

    if(req.query.page == "trending"){
        dataRes = await GetDataByCollection("trending");
        return res.json(dataRes);
    }
    return res.json();
})

app.post('/import/:typeData',async function(req, res){

    if(req.params.typeData.toLowerCase() == "moviedb"){
        //add data if null id
        //or edit with existing id
        if(req.body._id == undefined){
            // add
            if(req.body.name == undefined || req.body.director == undefined || req.body.description == undefined || req.body.type == undefined || req.body.release == undefined || req.body.country == undefined || req.body.url == undefined || req.body.rawImg == undefined){
                return res.json({status: false,message: "field missing"});   
            }else{
                return res.json({status: true,message: AddDataByCollection("moviedb", req.body)});               
            }
        }else{
            //check _id are exist TODO
            //else
            return res.json({status: false,message: "cannot find data by _id " + req.body._id}); 
        }   
    }

    if(req.params.typeData.toLowerCase() == "types"){
        //add new type of movie
    }
    if(req.params.typeData.toLowerCase() == "trending"){
        //change new list trending by list id movies
    }

    if(req.params.typeData.toLowerCase() == "users"){
        //add new user
        //if existing user change name
        console.log(req.body);
        return res.json(req.body); 
    }

    console.log(req.body.name);      // your JSON
    res.send(req.body);    // echo the result back
});

app.listen(PORT, () => console.log(`Started server at ${PORT}!`));
