var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dtggame');

var Question = mongoose.model('question',{
    id: String,
    title: String,
    options:
    [
        {
            text: String,
            img: String, 
            correct: Boolean
        },
        {
            text: String,
            img: String, 
            correct: Boolean
        },
        {
            text: String,
            img: String, 
            correct: Boolean
        },
        {
            text: String,
            img: String, 
            correct: Boolean
        }
    ]        
})

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
})

app.get('/game', function(req, res){
    res.render('game');
})

app.get('/services/:service', function(req, res){
    var service = req.params.service;
    
    if(service === 'getQuestions'){
        Question.find({}, function(err, data){
            res.send(data);
        });
    }else{
        res.redirect('/');
    } 
})

app.listen(3000, function(){
    console.log('Server is running...');
})