// JAI TAFFE SUR UN AUTRE DOSSIER POUR LE PROJET POUR CA QUE MES COMMITS SONT DE L'IMPORT DE CHAQUE PAGE 
//  JE RAJOUTE DES COMMENTAIRES LA OU JE PENSE QUE C'EST NECESSAIRE 

let questions = [
    {question: "Comment s'appelle le héros principal de One Piece?", choices: ["Monkey D. Luffy", "Zoro", "Shanks"], answer: "Monkey D. Luffy"},
    {question: "Quel est le rêve de Monkey D. Luffy?", choices: ["Devenir un empereur", "Devenir le Roi des Pirates", "Trouver le One Piece"], answer: "Devenir le Roi des Pirates"},
    {question: "Quel fruit du démon Luffy a-t-il mangé?", choices: ["Gomu Gomu no Mi", "Mera Mera no Mi", "Yami Yami no Mi"], answer: "Gomu Gomu no Mi"},
    {question: "Comment s'appelle le bateau des Chapeaux de Paille avant le Thousand Sunny?", choices: ["Vogue Merry", "Red Force", "Moby Dick"], answer: "Vogue Merry"},
    {question: "Quel est le nom du sabreur de l'équipage de Luffy?", choices: ["Sanji", "Brook", "Roronoa Zoro"], answer: "Roronoa Zoro"},
    {question: "Qui est le médecin de l'équipage des Chapeaux de Paille?", choices: ["Tony Tony Chopper", "Franky", "Nami"], answer: "Tony Tony Chopper"},
    {question: "Quel est le nom de l'île où se trouve la Marine et les prisons de haute sécurité?", choices: ["Marineford et Impel Down", "Dressrosa", "Sabaody"], answer: "Marineford et Impel Down"},
    {question: "Qui est le frère de Luffy qui a mangé le Mera Mera no Mi?", choices: ["Sabo", "Portgas D. Ace", "Garp"], answer: "Portgas D. Ace"},
    {question: "Quel est le nom du trésor légendaire recherché par tous les pirates?", choices: ["Le One Piece", "Le Davy Back Fight", "L'Op-Op Fruit"], answer: "Le One Piece"},
    {question: "Qui est le créateur de One Piece?", choices: ["Eiichirō Oda", "Masashi Kishimoto", "Akira Toriyama"], answer: "Eiichirō Oda"}
];


let playerName;
let score = 0;
let currentQuestionIndex = 0;
let gameState = "initializing";  
// etat du jeu


function start() {
    playerName = prompt("Entrez votre nom:");
    if (playerName === null || playerName.trim() === "") {
        playerName = "Anonyme"; 
    }
    document.getElementById("welcome").innerText = "Bienvenue " + playerName + " !";
    
    Question();
    gameState = "waiting";
}
// le .trim() enleve les blancs au debut et fin de string
// displayquestion, appelle la premiere question et change l'etat du jeu


function Question() {
    const quizDiv = document.getElementById("quiz");
    quizDiv.innerHTML = "";
    
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        
        
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<p>${currentQuestion.question}</p>`;
        // verifie s'il reste des question et crée la div et ajoute la classe pour la question
        
        
        let i = 0;
        while (i < currentQuestion.choices.length) {
            const button = document.createElement("button");
            button.innerText = currentQuestion.choices[i];
            button.setAttribute("data-index", i);
            
            
            button.addEventListener("click", function() {
                if (gameState === "waiting") {
                    reponse(this, currentQuestion);
                }
            });
            
            questionDiv.appendChild(button);
            i++;
        }
        
        quizDiv.appendChild(questionDiv);
    } else {
        
        Resultat();
    }
}
// crée le bouton pour les reponses, appel des fonctions pour réagit en conséquences, si plus de question a posé montre le resultat


function reponse(buttonElement, question) {
    gameState = "processing";
    const selectedChoice = buttonElement.innerText;
    
    
    if (selectedChoice === question.answer) {
        buttonElement.classList.add("correct");
        score++;
    } else {
        buttonElement.classList.add("incorrect");
        
    }
    
// verifie ta reponse et ajoute la classe qu'il faut si c'est correcte ou pas
    
    const buttons = document.querySelectorAll("#quiz button");
    let j = 0;
    while (j < buttons.length) {
        buttons[j].disabled = true;
        j++;
    }
    // empeche de choisir plusieurs reponses
    
    const answersDiv = document.getElementById("answers");
    const answerDiv = document.createElement("div");
    answerDiv.classList.add("answer");
    answerDiv.innerHTML = `${question.question}: ${selectedChoice}`;
    
    if (selectedChoice === question.answer) {
        answerDiv.classList.add("correct");
    } else {
        answerDiv.classList.add("incorrect");
        
    }
    
    answersDiv.appendChild(answerDiv);
    // affiche la reponse et la question choisi et ajoute la classe correcte ou incorrecte
    
    setTimeout(function() {
        currentQuestionIndex++;
        gameState = "initializing";
        Question();
        gameState = "waiting";
    }, 1500); 
}
// ajoute un delai avant de passer a la prochaine question, appelle la fontion pour la prochaine question

function Resultat() {
    gameState = "finished";
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");
    
    if (score >= 8) {
        resultDiv.innerText = "Bravo " + playerName + " ! T'es un loup de One Piece ! Score: " + score + "/" + questions.length;
    } else if (score >= 5) {
        resultDiv.innerText = "Pas mal " + playerName + " ! Moyen. Score: " + score + "/" + questions.length;
    } else {
        resultDiv.innerText = "Horrible " + playerName + "... Relis One Piece ! Score: " + score + "/" + questions.length;
    }
}
// change l'etat du jeu, enleve la classe hidden + mets un message approprié

start();
// start quizz