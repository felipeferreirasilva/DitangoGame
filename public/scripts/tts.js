function speak(content, idiom){
    if(idiom === "english"){
        responsiveVoice.speak(content, "US English Female", {rate: 0.8});
    }else if(idiom === "portuguese"){
        responsiveVoice.speak(content, "Brazilian Portuguese Female", {rate: 1.2});
    }
}