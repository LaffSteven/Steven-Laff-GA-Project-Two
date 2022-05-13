//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Card = require('./models/card.js')
const Deck = require('./models/deck.js')
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , () => {
    console.log('connected to mongo');
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Seed Data
//___________________
//localhost:3000
const cardSeed = require('./models/cardSeed.js')
const deckSeed = require('./models/deckSeed.js')

app.get('/card/data/seed', (req, res) => {
    Card.insertMany(cardSeed, (err, cards) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/');
    });
});

app.get('/deck/data/seed', (req, res) => {
    Deck.insertMany(deckSeed, (err, cards) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/');
    });
});

//___________________
// Routes
//___________________
//GET Home Page
app.get('/' , (req, res) => {
    Card.find({}, (err, cardData) => {
        res.render('index.ejs', {
            cards: cardData
        });
    });
});

// GET Card Index Page
app.get('/card/index', (req, res) => {
    Card.find({}, (err, cardData) => {
        res.render('./card/index.ejs', {
            cards: cardData
        });
    });
});

// SHOW Card info page
app.get('/card/:id', (req, res) => {
    // console.log(req.params.id);
    Card.find({_id:req.params.id}, (err, foundCard) => {
        // res.send(cardInfo[0])
        res.render('./card/show.ejs', {
            card: foundCard[0]
        });
    });
});

//PUT Card ID
app.put('/card/:id', (req, res) => {
    Card.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true}, (err, updatedCard) => {
        res.redirect('/card/index');
    });
});

//GET card edit page
app.get('/card/:id/edit', (req, res) => {
    Card.find({_id:req.params.id}, (err, foundCard) => {
        res.render('./card/edit.ejs', {
            card: foundCard[0]
        });
    });
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
