var isGameStarted = false; 
var hits = 0;
var timer = 30;
var countdown; 

// To Start Game: Code Snippet

document.addEventListener("keydown",() => {
    if(!isGameStarted){
        document.getElementsByClassName("message")[0].innerText = "Lets Begin!"; 
        document.getElementsByClassName("score")[0].innerText = ''; 
        isGameStarted = true; 
        hits = 0;
        timer = 30;

        setTimeout(() => {
            document.getElementsByClassName("message")[0].innerText = " ";
            startGame();
        },2000)
    }
})

// Intial Game Logic: Code Snippet

function startGame(){
    updateUI();

    countdown = setInterval(function() {
        if(timer > 0){
            timer -= 1;
            updateUI();
            moleIsVisible();
        }else{
            endGame();
        }
    },1000);
}
        
// Updates the Statsbar: Code Snippet

function updateUI(){
    document.getElementsByClassName("score")[0].innerText = `${hits} hits`; 
    document.getElementsByClassName("timer")[0].innerText = `${timer} secs left`; 
    
    if(timer <= 10){
        document.getElementsByClassName("timer")[0].style.color = "navy"; 
    }
}

// Game Logic: Code Snippet

function moleIsVisible(){
    // Hides all moles for each second using this code snippet
    var allMoles = document.querySelectorAll('.mole');
    allMoles.forEach(mole => {
        mole.style.opacity = 0
        mole.removeEventListener("click", handleMoleClick);
    }); 

    // randomly moles are visble using this code snippet
    var holeNumber = Math.floor(Math.random()*15) + 1;
    var moleNumber = document.querySelector('.hole'+ holeNumber);

    // console.log(`The mole is hole ${holeNumber}`)

    // handles user click and hides mole once again
    if(moleNumber){
        moleNumber.style.opacity = 1;

        // prevents multiple score increments from a single mole.
        moleNumber.addEventListener("click",handleMoleClick,{ once: true });  
        
        setTimeout(()=>{
            moleNumber.style.opacity = 0;
            // moleNumber.removeEventListener("click", handleMoleClick);
        },800)
    }
}

// To handle mole click: Code Snippet

function handleMoleClick() {
    hits += 1;
    this.style.opacity = 0;
    this.removeEventListener("click", handleMoleClick);
}

// End Game and Restart: Code Snippet
function endGame(){
    clearInterval(countdown);
    
    document.getElementsByClassName("score")[0].innerText = `${hits} hits`; 
    document.getElementsByClassName("timer")[0].innerText = ""; 
    document.getElementsByClassName("timer")[0].style.color = "maroon";
    document.getElementsByClassName("message")[0].innerText = "Time's Up, Press any key to start again!";
    
    isGameStarted = false;
}
