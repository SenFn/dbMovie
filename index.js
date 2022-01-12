const express = require('express');
const { json } = require('express/lib/response');
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
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertOne(jsonData, function(err, res) {
        if (err) throw err;
        console.log("1 document insert on "+ collectionName);
        return;
    });
}

async function UpdateDataByCollectionUsers(collectionName, jsonData){
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const findOne = await collection.findOne({email:jsonData.email}).then(user => user);
    
    if(findOne == undefined){
        //add user
        if(jsonData.name == ""){
            jsonData.name = jsonData.email;
        }
        await AddDataByCollection(collectionName, jsonData);
        return await collection.findOne({email:jsonData.email});
    }else{
        //update user
        if(jsonData.name != "" && findOne.name != findOne.email){
            collection.updateOne({email:jsonData.email}, {$set:{name:jsonData.name, pass:jsonData.pass}}, async function(err, res) {
                if (err) throw err;
                console.log("1 document update on "+ collectionName);
                return await collection.findOne({email:jsonData.email});
            });
        }
    }
    
    return await collection.findOne({email:jsonData.email});
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
        const dataGet = await UpdateDataByCollectionUsers("users",req.body);
        return res.json({status:true, message:dataGet.name });         
    }

    console.log(req.body.name);      // your JSON
    res.send(req.body);    // echo the result back
});

let lenCode = 4;
const ListRoom = [];
function roomID(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function checkGood(string) {
    for(let i=0;i<ListRoom.length;i++){
        if(ListRoom[i] == string){
            checkGood(roomID(lenCode))
        }
    }
    ListRoom.push(string);
    return string;
}

function checkAlive(string) {
    for(let i=0;i<ListRoom.length;i++){
        if(ListRoom[i] == string){
            return true;
        }
    }
    return false;
}


app.get('/create',async function(req, res){   
    let roomCreate =checkGood(roomID(lenCode));
    console.log({create: roomCreate});
    return res.json({status: true,message: roomCreate});
});


app.get('/join',async function(req, res){
    let roomGet = req.query.code.toUpperCase();
    let isValid = checkAlive(roomGet);
    return res.json({status: isValid});
});

app.get('/leave',async function(req, res){
    let roomGet = req.query.code.toUpperCase();

    var index = ListRoom.indexOf(roomGet);
    if (index !== -1) {
        ListRoom.splice(index, 1);
    }
    console.log({remove: roomGet});
    return res.json({status: true});
});

app.listen(PORT, () => console.log(`Started server at ${PORT}!`));
