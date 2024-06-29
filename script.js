document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    const myQuestions = [
        {
            question: "What is the capital of France?",
            answers: {
                a: "Berlin",
                b: "Madrid",
                c: "Paris",
                d: "Lisbon"
            },
            correctAnswer: "c"
        },
        {
            question: "Who is the CEO of Tesla?",
            answers: {
                a: "Jeff Bezos",
                b: "Elon Musk",
                c: "Bill Gates",
                d: "Steve Jobs"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the tallest mountain in the world?",
            answers: {
                a: "K2",
                b: "Kangchenjunga",
                c: "Mount Everest",
                d: "Lhotse"
            },
            correctAnswer: "c"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: {
                a: "Venus",
                b: "Mars",
                c: "Jupiter",
                d: "Saturn"
            },
            correctAnswer: "b"
        },
        {
            question: "Who wrote the play 'Romeo and Juliet'?",
            answers: {
                a: "William Shakespeare",
                b: "Charles Dickens",
                c: "Mark Twain",
                d: "Jane Austen"
            },
            correctAnswer: "a"
        }
    ];

    function buildQuiz() {
        const output = [];
        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {
                answers.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${letter}">
                        ${letter} :
                        ${currentQuestion.answers[letter]}
                    </label>`
                );
            }
            output.push(
                `<div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>`
            );
        });
        quizContainer.innerHTML = output.join('');
    }

    function showResults() {
        const answerContainers = quizContainer.querySelectorAll('.answers');
        let numCorrect = 0;

        myQuestions.forEach((currentQuestion, questionNumber) => {
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if (userAnswer === currentQuestion.correctAnswer) {
                numCorrect++;
                answerContainers[questionNumber].style.color = 'green';
            } else {
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // Display the score
        resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} correct`;
        
        // Send the score to PHP for further processing
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'score.php', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            console.log(xhr.responseText); // Optional: Log the server response
        };
        xhr.send(`score=${numCorrect}`);
    }

    buildQuiz();
    submitButton.addEventListener('click', showResults);
});
