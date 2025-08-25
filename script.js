const questions = [
  {
    question: "Qual linguagem é usada principalmente para estilizar páginas web?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "JavaScript", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Qual comando em JavaScript serve para exibir uma mensagem no console?",
    answers: [
      { text: "console.print()", correct: false },
      { text: "print()", correct: false },
      { text: "console.log()", correct: true },
      { text: "log.console()", correct: false }
    ]
  },
  {
    question: "O que significa 'API' no contexto de programação?",
    answers: [
      { text: "Aplicação para interface", correct: false },
      { text: "Interface de programação de aplicações", correct: true },
      { text: "Aplicação programada internamente", correct: false },
      { text: "Análise de programação integrada", correct: false }
    ]
  },
  {
    question: "Qual das opções é uma estrutura de dados do tipo LIFO?",
    answers: [
      { text: "Fila (Queue)", correct: false },
      { text: "Pilha (Stack)", correct: true },
      { text: "Árvore (Tree)", correct: false },
      { text: "Grafo (Graph)", correct: false }
    ]
  },
  {
    question: "Em Python, qual palavra-chave é usada para criar uma função?",
    answers: [
      { text: "function", correct: false },
      { text: "def", correct: true },
      { text: "fun", correct: false },
      { text: "func", correct: false }
    ]
  },
  {
    question: "O que faz a propriedade CSS 'flex-wrap'?",
    answers: [
      { text: "Define a direção dos itens flexíveis", correct: false },
      { text: "Permite que os itens flexíveis quebrem linha", correct: true },
      { text: "Alinha os itens ao centro", correct: false },
      { text: "Define a largura dos itens flexíveis", correct: false }
    ]
  },
  {
    question: "Qual tag HTML é usada para incorporar uma imagem?",
    answers: [
      { text: "<image>", correct: false },
      { text: "<img>", correct: true },
      { text: "<src>", correct: false },
      { text: "<picture>", correct: false }
    ]
  },
  {
    question: "Qual é o valor de 'null' em JavaScript?",
    answers: [
      { text: "Um objeto vazio", correct: false },
      { text: "Uma variável não definida", correct: false },
      { text: "Ausência intencional de valor", correct: true },
      { text: "Zero", correct: false }
    ]
  },
  {
    question: "Qual comando Git é usado para criar um novo repositório local?",
    answers: [
      { text: "git clone", correct: false },
      { text: "git init", correct: true },
      { text: "git start", correct: false },
      { text: "git new", correct: false }
    ]
  },
  {
    question: "Qual palavra-chave JavaScript declara uma constante?",
    answers: [
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "var", correct: false },
      { text: "constant", correct: false }
    ]
  }
];



const questionElement = document.getElementById("pergunta");
const answerButtons = document.getElementById("botoes-resposta");
const nextButton = document.getElementById("btn-proximo");

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Próxima";
  nextButton.style.display = "none";
  resetState();
  showQuestion();
  nextButton.removeEventListener("click", restartQuiz);
  nextButton.addEventListener("click", handleNextButton);
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorret");
  }

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();

  if (score >= 6) {
    questionElement.innerText = `🎉 Parabéns! Você acertou ${score} de ${questions.length} perguntas (${Math.round((score / questions.length) * 100)}%).`;
  } else {
    questionElement.innerText = `😕 Que pena! Você acertou apenas ${score} de ${questions.length} perguntas. Continue estudando e tente novamente!`;
  }

  nextButton.innerText = "Reiniciar";
  nextButton.style.display = "block";

  
  nextButton.removeEventListener("click", handleNextButton);
  nextButton.addEventListener("click", restartQuiz);
}

function restartQuiz() {
  startQuiz();
}
