import https from "https";
import {decode} from 'html-entities';

let showQuestion = (req, res) => {

  var questionNumberParam = req.params.questionNumber;

  var questionNumber = questionNumberParam;

  var category = req.body.category;

  var amount = req.body.number;
  var score = req.body.score;

  //correct answer goes here
var correct_answer = "";

//variable for the current question
var question = "";

var round_questions = [];

const api_url = "https://opentdb.com/api.php?type=multiple&category=" + category + "&amount=" + amount;

https.get(api_url, function(response) {

  response.on("data", function(data) {
    const quizQuestions = JSON.parse(data);
    console.log(quizQuestions)

    //if we're on the first question of the quiz, then create the array of questions
    //for this round:
    if (questionNumber == 0) {

      for (var i = 0; i < quizQuestions.results.length; i++) {
        const curr_question = new Object();
        var all_choices = new Array();
        var choice = decode(quizQuestions.results[i].correct_answer);
        all_choices.push(choice);
        for (var j = 0; j < quizQuestions.results[i].incorrect_answers.length; j++) {
          var incorrect_choice = decode(quizQuestions.results[i].correct_answer);
          all_choices.push(incorrect_choice);
        }

        curr_question.question = decode(quizQuestions.results[i].question);

        //shuffle all_answers
        all_choices = shuffle(all_choices);
        curr_question.answerchoices = all_choices;
        curr_question.correct_answer = decode(quizQuestions.results[i].correct_answer);

        round_questions.push(curr_question);

      }
    }

    //if the question number is less than the length of the array but not 0, then
    //initialize the current question

    if (questionNumber < round_questions.length) {
      question = round_questions[questionNumber].question;
    }

    questionNumber++;

    //otherwise show the next question
    if(req.user){
    res.render("quizquestions", {
      round_questions: round_questions,
      questionNumber: questionNumber,
      user: req.user,
      score: score
    });
  } else {
    res.render("quizquestions", {
      round_questions: round_questions,
      questionNumber: questionNumber,
      user: "",
      score: score
    });
  }

  });
});

}

//function that shuffles an array
function shuffle(array) {
  var currentIndex = array.length,
    temp, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}


module.exports = {
  showQuestion: showQuestion
}
