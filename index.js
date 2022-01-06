const express = require('express');
const app = express();

const PORT =  process.env.PORT ||3000;
app.get("/index", async(req,res) => {
    return res.json(require("./db.json"));
})

app.get("/theloai", async(req,res) => {
    return res.json(require("./types.json"));
})

app.get("/trending", async(req,res) => {
    return res.json(require("./trending.json"));
})

app.listen(PORT, () => console.log(`Started server at ${PORT}!`));
