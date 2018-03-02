const appID = 'NMDPTRIAL_felipeferreirasilva20140617110441';
const appKey = '03f129f8eb8a576adba6c1b4da7c59eade02e7acde50412236262bb703dfa507d0ceffbb59572634fde7e8d76341c14143a9ed22f92e442f556fe6584f8b5f1f';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Nuance = require("nuance");
const nuance = new Nuance(appID, appKey);
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    safeFileNames: true,
    preserveExtension: true,
}));

mongoose.connect('mongodb://localhost/dtggame');

const Question = mongoose.model('question',{
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

app.get('/services/getQuestions', function(req, res){
    var service = req.params.service;
    Question.find({}, function(err, data){
        res.send(data);
    });
})

app.get('/services/getAudio', function(req, res){
    nuance.sendTTSRequest({
        "text": "His name is <ESC>\pause=300\ Michael.",
        "output": "public/audios/testFile.wav",
        "outputFormat": "wav", 
        "language": "en_US",
        "voice": "Tom", 
        "identifier": "randomIdentifierStringHere",
        "success": function(){
            res.send('The file was saved.');
        },
        "error": function(response){
            res.send('An error was occurred');
        }
    });
})

app.post('/services/newquestion', function(req, res){
    var data = req.body;
    
    var photo1 = req.files.photo1;
    var photo2 = req.files.photo2;
    var photo3 = req.files.photo3;
    var photo4 = req.files.photo4;

    var photo1Correct = false;
    var photo2Correct = false;
    var photo3Correct = false;
    var photo4Correct = false;

    switch(data.correct) {
        case '0':
            photo1Correct = true;
            break;
        case '1':
            photo2Correct = true;
            break;
        case '2':
            photo3Correct = true;
            break;
        case '3':
            photo4Correct = true;
            break;
    }
    
    var photo1Name = Math.floor((Math.random() * 999999) + 1) + photo1.name;
    var photo2Name = Math.floor((Math.random() * 999999) + 1) + photo2.name; 
    var photo3Name = Math.floor((Math.random() * 999999) + 1) + photo3.name;
    var photo4Name = Math.floor((Math.random() * 999999) + 1) + photo4.name;

    if(photo1.mimetype === 'image/png' || photo1.mimetype === 'image/jpeg'){
        photo1.mv('public/images/upload/' + photo1Name, function(err) {});
        photo2.mv('public/images/upload/' + photo2Name, function(err) {});
        photo3.mv('public/images/upload/' + photo3Name, function(err) {});
        photo4.mv('public/images/upload/' + photo4Name, function(err) {});

        var newQuestion = new Question({
            title: data.title,
            options:
            [
                {
                    text: data.text1,
                    img: photo1Name,
                    correct: photo1Correct
                },
                {
                    text: data.text2,
                    img: photo2Name,
                    correct: photo2Correct
                },
                {
                    text: data.text3,
                    img: photo3Name,
                    correct: photo3Correct
                },
                {
                    text: data.text4,
                    img: photo4Name,
                    correct: photo4Correct
                }
            ]
        });
    
        newQuestion.save().then(function(){
            res.redirect('/newquestion');
        });

    }else{
        res.send('Erro no Upload, tente novamente');
    }
})

app.get('/newquestion', function(req, res){
    res.render('newquestion');
})

app.listen(3000, function(){
    console.log('Server is running...');
})