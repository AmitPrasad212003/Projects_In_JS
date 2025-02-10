document.addEventListener("DOMContentLoaded", () =>{

    const playQuiz = document.getElementById("playQuiz");
    const startBtn = document.getElementById("start-btn");
    const nextBtn = document.getElementById("next-btn");
    const restartBtn = document.getElementById("restart-btn");
    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const resultContainer = document.getElementById("result-container");
    const scoreDisplay = document.getElementById("score")


    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Earth", "Mars", "Jupiter", "Venus"],
            answer: "Mars",
        },
        {
            question: "Who wrote 'Hamlet'?",
            choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            answer: "William Shakespeare",
        },
        {
            question: "What is the largest ocean on Earth?",
            choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: "Pacific Ocean",
        },
        {
            question: "What is the chemical symbol for Gold?",
            choices: ["Go", "Ag", "Au", "Pt"],
            answer: "Au",
        },
        {
            question: "Which is the longest river in the world?",
            choices: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            answer: "Nile River",
        },
        {
            question: "Who developed the theory of relativity?",
            choices: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"],
            answer: "Albert Einstein",
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    startBtn.addEventListener('click', startQuiz);

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showResult();
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add("hidden");
        startQuiz();
    })

    function startQuiz(){
        playQuiz.classList.add('hidden');
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden')
        showQuestion();
    }

    function showQuestion(){
        nextBtn.classList.add('hidden');
        questionText.textContent = questions[currentQuestionIndex].question;
        choicesList.innerHTML = ""; //clear previous choices
        questions[currentQuestionIndex].choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener('click', () => selectAnswer(choice));
            choicesList.appendChild(li);
        });
    }

    function selectAnswer(choice){
        const correctAnswer = questions[currentQuestionIndex].answer;
  
        if(choice === correctAnswer ){
            score++;
            
        }
        nextBtn.classList.remove('hidden');
    }
    
    function showResult(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`
    }

});