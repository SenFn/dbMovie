const express = require('express');
const app = express();

const PORT =  process.env.PORT ||3000;
app.get("/index", async(req,res) => {
    if(req.query == "") return res.json(); ;

    if(req.query.page == "home")
        return res.json(require("./db.json"));

    if(req.query.page == "theloai")
        return res.json(require("./types.json"));

    if(req.query.page == "trending")
        return res.json(require("./trending.json")); 
    return res.json(); ;
})

app.listen(PORT, () => console.log(`Started server at ${PORT}!`));
