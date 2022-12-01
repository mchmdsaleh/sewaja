const express = require("express");
const flash = require('connect-flash');
const path = require("path");
var methodOverride = require('method-override');
var engine = require('ejs-mate');
const { default: mongoose } = require("mongoose");
const Campground = require('./models/campground');



mongoose.connect('mongodb://localhost:27017/sewaja')
    .then(() =>{
        console.log('Connect')
    })
    .catch((err)=>{
        console.log(err)
    })

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database Connected");
})

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
// app.use(flash());


// app.use((req, res, next) => {
//     res.locals.currentUser = req.user;
//     res.locals.success = req.flash('success');
//     res.locals.error = req.flash('error');
//     next();
// })

// set listen port
app.listen(3000, ()=>{
    console.log("Listen On 3000")
})

app.get('/', (req,res)=>{
    res.render('home')
})

app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new')
})

app.post('/campgrounds', async (req,res)=>{
    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground})
})

app.get('/campgrounds/:id/edit', async (req,res)=>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id', async (req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id', async (req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})