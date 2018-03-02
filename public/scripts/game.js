window.onload = function(){
    $('.loader').hide();
};

var url = 'http://localhost:3000/services/';

var questionTitle = document.querySelector('#questionTitle');
var questionImage = document.querySelector('#questionImage');
var questionText = document.querySelector('#questionText');
var questionContent = document.querySelector('#question');

var correctSound = new Audio('audios/correctSound.mp3');
var incorrectSound = new Audio('audios/incorrectSound.mp3');

var questions = [];
var questionNumber = 0;

function getQuestions(callback){
    $.getJSON(url + 'getQuestions', function(data){
        callback(data);
    })
}

function setQuestionData(){
    getQuestions(function(data){
        questions = data;
        questionNumber = data.length -1 ;
        prepareQuestion();
    });
}

function prepareQuestion(){
    var newQuestionContent = "";
    questionTitle.textContent = questions[questionNumber].title;
    questions[questionNumber].options.forEach(function(question){
        questionImage.setAttribute('src', ('images/upload/' + question.img));
        questionText.textContent = question.text;
        newQuestionContent += questionContent.innerHTML;
    });     
    questionContent.innerHTML = newQuestionContent;  
    setEvents();      
}

function setEvents(){
    document.querySelectorAll('#questionText').forEach(function(btn, index){
        btn.setAttribute('value', index);
        btn.addEventListener('click', function(){
            if(questions[questionNumber].options[this.value].correct){
                this.classList.remove('btn-danger');
                this.classList.add('btn-success'); 
                correctSound.play();
                setTimeout(function(){
                    prepareNextQuestion();
                }, 3000);
            }else{
                this.classList.remove('btn-danger');
                this.setAttribute('disabled',' ')
                this.classList.add('btn-secondary'); 
                incorrectSound.play();
            }
        });
    });
}

function prepareNextQuestion(){
    if(questionNumber > 0){
        questionNumber--; 
        questionTitle.textContent = questions[questionNumber].title;
        document.querySelectorAll('#questionImage').forEach(function(image, i){
            image.setAttribute('src', 'images/upload/' + questions[questionNumber].options[i].img);
        });
        document.querySelectorAll('#questionText').forEach(function(button, i){
            button.textContent = questions[questionNumber].options[i].text;
            button.classList.remove('btn-secondary', 'btn-success');
            button.classList.add('btn-danger');
            button.removeAttribute('disabled',' ');
        });
        setEvents();
    }else{
        // FIM DE JOGO;
    }
    
}

setQuestionData();