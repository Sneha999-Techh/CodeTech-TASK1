const questions = {
    "General Knowledge": [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"], answer: "Harper Lee" },
        { question: "What is the largest planet?", options: ["Mars", "Jupiter", "Earth", "Saturn"], answer: "Jupiter" },
        { question: "Which country is known as the Land of Rising Sun?", options: ["Japan", "China", "Korea", "India"], answer: "Japan" },
        { question: "What is the boiling point of water?", options: ["100°C", "50°C", "80°C", "90°C"], answer: "100°C" }
    ],
    "Science": [
        { question: "What is H2O?", options: ["Water", "Hydrogen", "Oxygen", "Helium"], answer: "Water" },
        { question: "What planet is known as the Red Planet?", options: ["Mars", "Venus", "Jupiter", "Saturn"], answer: "Mars" },
        { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], answer: "Mitochondria" },
        { question: "What gas do plants use for photosynthesis?", options: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"], answer: "Carbon Dioxide" },
        { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "50,000 km/s"], answer: "300,000 km/s" }
    ],
    "History": [
        { question: "Who was the first President of the USA?", options: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"], answer: "George Washington" },
        { question: "When did World War II end?", options: ["1945", "1939", "1944", "1940"], answer: "1945" },
        { question: "Who discovered America?", options: ["Christopher Columbus", "Vasco da Gama", "Magellan", "Cook"], answer: "Christopher Columbus" },
        { question: "What year did the Titanic sink?", options: ["1912", "1905", "1920", "1915"], answer: "1912" },
        { question: "Who painted the Mona Lisa?", options: ["Leonardo da Vinci", "Picasso", "Van Gogh", "Michelangelo"], answer: "Leonardo da Vinci" }
    ]
};

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('category-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const questionData = questions[currentCategory][currentQuestionIndex];
    document.getElementById('question').textContent = questionData.question;
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option, button);
        optionsElement.appendChild(button);
    });
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('next-button').style.display = 'none';
}

function checkAnswer(selectedOption, button) {
    const questionData = questions[currentCategory][currentQuestionIndex];
    const feedbackElement = document.getElementById('feedback');
    if (selectedOption === questionData.answer) {
        feedbackElement.textContent = "Correct! 🎉";
        button.style.background = "#28a745"; // Green for correct
        score++;
    } else {
        feedbackElement.textContent = `Incorrect! The correct answer was: ${questionData.answer}`;
        button.style.background = "#dc3545"; // Red for incorrect
    }
    feedbackElement.style.display = 'block';
    Array.from(document.getElementById('options').children).forEach(btn => btn.disabled = true);
    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[currentCategory].length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('score').textContent = `${score} / ${questions[currentCategory].length}`;
}

function restartQuiz() {
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('category-container').style.display = 'block';
}