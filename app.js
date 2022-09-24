const express = require("express");
const path = require("path");
const { default: mongoose } = require("mongoose");
const Campground = require('.models/campground')


mongoose.connect('mongodb://localhost:27017/sewaja', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
})

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

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ tittle: 'My Backyard' , description: 'Cheap Camp'})
    await camp.save();
    res.send(camp)
})
