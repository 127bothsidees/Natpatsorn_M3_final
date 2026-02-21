let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (slides.length === 0) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }


    slides.forEach(slide => {
        slide.classList.remove('active');
    });


    slides[currentSlide].classList.add('active');
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}


setInterval(() => {
    moveSlide(1);
}, 6550);


document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12 
    };


    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                entry.target.classList.remove('reveal-hidden');
                entry.target.classList.add('reveal-animate');
                
               
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);


    const targetSelectors = [
        '.aboutme-text', '.mhb', 
        '.reading-book', '.fav-book', '.e-book', '.read-song',
        '.watching-series', '.into-sr', '.c-recommend',
        '.play-game-text', '.game-exp', '.fav-game-text',
		'#minigame-section' 
    ];

    targetSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.add('reveal-hidden'); 
            observer.observe(el);             
        });
    });
});


let playerScore = 0;
let compScore = 0;

function playTurn(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const compChoice = choices[Math.floor(Math.random() * 3)];
    
    let resultMessage = "";
    let msgColor = "";
    let bgColor = "";


    if (playerChoice === compChoice) {
        resultMessage = `It's a tie! Both chose ${playerChoice}.`;
        msgColor = "#462709"; 
        bgColor = "#EBEBEB";  
    } else if (
        (playerChoice === 'rock' && compChoice === 'scissors') ||
        (playerChoice === 'paper' && compChoice === 'rock') ||
        (playerChoice === 'scissors' && compChoice === 'paper')
    ) {
        resultMessage = `You win! ${playerChoice} beats ${compChoice}.`;
        playerScore++;
        msgColor = "#155724"; 
        bgColor = "#d4edda";  
    } else {
        resultMessage = `You lose! ${compChoice} beats ${playerChoice}.`;
        compScore++;
        msgColor = "#721c24"; 
        bgColor = "#f8d7da";  
    }


    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('comp-score').innerText = compScore;
    
    const feedbackEl = document.getElementById('game-message');
    feedbackEl.innerText = resultMessage;
    feedbackEl.style.color = msgColor;
    feedbackEl.style.backgroundColor = bgColor;
}

function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-content').style.display = 'block';
}

function resetGame() {
    // Reset scores
    playerScore = 0;
    compScore = 0;
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('comp-score').innerText = compScore;
    
    // Reset feedback message
    const feedbackEl = document.getElementById('game-message');
    feedbackEl.innerText = "Game reset. Choose your move to start!";
    feedbackEl.style.color = "#462709";
    feedbackEl.style.backgroundColor = "transparent";

    // Hide the game content and show the Start screen again
    document.getElementById('game-content').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}