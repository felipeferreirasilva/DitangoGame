var url = 'http://localhost:3000/services/';
var questionNumber = 0;
var questionTitle = document.querySelector('#questionTitle');
var questionImage = document.querySelector('#questionImage');
var questionOption = document.querySelector('#questionOption');

function getQuestions(callback){
    $.getJSON(url + 'getQuestions', function(data){
        callback(data);
    })
}

function setQuestion(questionNumber){
    getQuestions(function(questions){
        questionTitle.textContent = questions[questionNumber].title;
        questions[questionNumber].options.forEach(function(question){
            questionImage.innerHTML += '<td><img src="images/' + question.img + '\"></td>';
            questionOption.innerHTML += '<td><button>' + question.text + '</button></td>';
        });
    })
}

// function speak(content, idiom){
//     if(idiom === "english"){
//         responsiveVoice.speak(content, "US English Female", {rate: 0.8});
//     }else if(idiom === "portuguese"){
//         responsiveVoice.speak(content, "Brazilian Portuguese Female", {rate: 1.2});
//     }
// }


setQuestion(0);