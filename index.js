const express = require('express');
const app = express();

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

app.listen(PORT, () => console.log(`Started server at ${PORT}!`));
