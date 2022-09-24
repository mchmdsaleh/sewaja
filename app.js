const express = require("express");
const path = require("path");
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// set listen port
app.listen(3000, ()=>{
    console.log("Listen On 3000")
})

app.get('/', (req,res)=>{
    res.render('home')
})
