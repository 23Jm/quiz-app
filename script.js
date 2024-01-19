const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: "false" },
      { text: "Blue Whale", correct: "true" },
      { text: "Elephant", correct: "false" },
      { text: "Giraffe", correct: "false" },
    ],
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincet van Gogh", correct: "false" },
      { text: "Pablo Picasso", correct: "false" },
      { text: "Leonardo da Vinci", correct: "true" },
      { text: "Michelangelo", correct: "false" },
    ],
  },
  {
    question: "Which is the largest ocean in the world?",
    answers: [
      { text: "Atlantic Ocean", correct: "false" },
      { text: "Indian Ocean", correct: "false" },
      { text: "Arctic Ocean", correct: "false" },
      { text: "Pacific Ocean", correct: "true" },
    ],
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    answers: [
      { text: "Venus", correct: "false" },
      { text: "Mars", correct: "true" },
      { text: "Jupiter", correct: "false" },
      { text: "Mercury", correct: "false" },
    ],
  },
  {
    question: "What is the currency of japan?",
    answers: [
      { text: "yen", correct: "true" },
      { text: "Dollar", correct: "false" },
      { text: "Rupee", correct: "false" },
      { text: "Euro", correct: "false" },
    ],
  },
  {
    question: "Which is the tallest mountain in the world?",
    answers: [
      { text: "Mount Kilimanjaro", correct: "false" },
      { text: "Mount McKinley", correct: "false" },
      { text: "Mount Fuji", correct: "false" },
      { text: "Mount Everest", correct: "true" },
    ],
  },
  {
    question: "which is the largest organ in the human body?",
    answers: [
      { text: "Liver", correct: "false" },
      { text: "Heart", correct: "false" },
      { text: "Skin", correct: "true" },
      { text: "Brain", correct: "false" },
    ],
  },
  {
    question: "which of the following is not a fruit?",
    answers: [
      { text: "Rhubarb", correct: "true" },
      { text: "Banana", correct: "false" },
      { text: "Tomato", correct: "false" },
      { text: "Avacados", correct: "false" },
    ],
  },
];

const questionElement=document.querySelector("#question");
const answerButtons=document.querySelector("#answer-buttons");
const nextButton=document.querySelector("#next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){

    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
          button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })

}

function resetState(){
   nextButton.style.display="none";
   while(answerButtons.firstChild)
   {
    answerButtons.removeChild(answerButtons.firstChild);
   }

}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button=>{
    if(button.dataset.correct ==="true"){
        button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length)
  {
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length)
    {
       showQuestion();
    }
    else
    {
        showScore();
    }
  }
  else
  {
    startQuiz();
  }
});
function showScore(){
   resetState();
   questionElement.innerHTML=`you scored ${score} out of ${questions.length}`;
   nextButton.style.display="block";
   nextButton.innerHTML="Play Again";
}

startQuiz();