// --- Section Switch ---
function showSection(id) {
    document.querySelectorAll('.game-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// ---------------- Tic-Tac-Toe ----------------
let tttBoard = ["", "", "", "", "", "", "", "", ""];
let tttPlayer = "X";

function drawTicTacToe() {
    const boardDiv = document.getElementById('ttt-board');
    boardDiv.innerHTML = '';
    tttBoard.forEach((cell, index) => {
        const div = document.createElement('div');
        div.classList.add('cell');
        div.textContent = cell;
        div.onclick = () => makeMove(index);
        boardDiv.appendChild(div);
    });
}

function makeMove(index) {
    if (tttBoard[index] === "") {
        tttBoard[index] = tttPlayer;
        tttPlayer = tttPlayer === "X" ? "O" : "X";
        aiMove();
        drawTicTacToe();
        checkWinner();
    }
}

function aiMove() {
    let empty = tttBoard.map((v,i)=> v==""?i:null).filter(v=>v!=null);
    if(empty.length===0) return;
    let move = empty[Math.floor(Math.random()*empty.length)];
    tttBoard[move] = "O";
    tttPlayer = "X";
}

function checkWinner() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for(let w of wins){
        const [a,b,c] = w;
        if(tttBoard[a] && tttBoard[a]===tttBoard[b] && tttBoard[a]===tttBoard[c]){
            alert(tttBoard[a] + " wins!");
            resetTicTacToe();
        }
    }
}

function resetTicTacToe(){
    tttBoard = ["", "", "", "", "", "", "", "", ""];
    drawTicTacToe();
}

drawTicTacToe();

// ---------------- Quiz ----------------
const questions = [
    {q:"What is 7 x 8?", a:"56"},
    {q:"Capital of India?", a:"New Delhi"},
    {q:"H2O is chemical formula of?", a:"Water"},
    {q:"Square of 12?", a:"144"},
    {q:"7+6-3=?", a:"10"}
];

let currentQ = 0;

function checkQuizAnswer(){
    let ans = document.getElementById('quiz-answer').value;
    let feedback = document.getElementById('quiz-feedback');
    if(ans.trim().toLowerCase() === questions[currentQ].a.toLowerCase()){
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Wrong! Answer: " + questions[currentQ].a;
    }
    currentQ = (currentQ+1)%questions.length;
    document.getElementById('quiz-question').textContent = questions[currentQ].q;
    document.getElementById('quiz-answer').value = "";
}

// Initialize first question
document.getElementById('quiz-question').textContent = questions[currentQ].q;

// ---------------- Find My Number ----------------
let numberToGuess = Math.floor(Math.random()*100)+1;

function checkGuess(){
    let guess = Number(document.getElementById('guess').value);
    let feedback = document.getElementById('guess-feedback');
    if(guess === numberToGuess) {
        feedback.textContent = "🎉 Correct! Number was " + numberToGuess;
        numberToGuess = Math.floor(Math.random()*100)+1;
    } else if(guess < numberToGuess) {
        feedback.textContent = "Too low!";
    } else {
        feedback.textContent = "Too high!";
    }
}

// ---------------- Chess Placeholder ----------------
function resetChess(){
    document.getElementById('chess-board').textContent = "Chess AI coming soon!";
}
