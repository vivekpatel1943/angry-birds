const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const redBirds = [];
// let greenBirdFlying = false;
// let gameOn = false;
let score = 0;
let isPaused = true;
let moveGreenBirdInterval;
let moveRedBirdInterval;
let createRedBirdInterval;
let scoreInterval;


const scorebox = document.getElementById('scorebox');


// properties for the green bird
const greenBird = {
    x : 20,
    y : 200,
    width:20,
    height:20,
    color:'green',
}


// properties for the redBird 
const createRedBird = () => {
    const redBird = {
        x : 1070,
        y : Math.floor(Math.random() * canvas.height),
        width:20,
        height:20,
        color:'red',
    }
    redBirds.push(redBird);
}


// main draw function to handle all drawing
function draw(){
    // if(isPaused) return ; //skip drawing when paused

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // draw greenBird
    ctx.fillStyle = greenBird.color;
    ctx.fillRect(greenBird.x,greenBird.y,greenBird.width,greenBird.height);

    // draw redBird
    redBirds.forEach((redBird) => {
        ctx.fillStyle = redBird.color;
        ctx.fillRect(redBird.x,redBird.y,redBird.width,redBird.height);
    })

    // detects collision between green and red bird
    collision();

    requestAnimationFrame(draw);
}

// move red birds to the left by decreasing their x coordinate
const updateRedBirds = () => {
    if(!isPaused){

        redBirds.forEach((redBird,index) => {
            redBird.x -= 1;

            // if any of the redBirds have gone off screen they will be removed from the list
            // this will help to prevent memory buildup 
            if(redBird.x < 0){
                redBirds.splice(index,1);
            }

        })
 

    }
   
}

// move greenBird to the right and when they are already on the right edge bring them to the left again
const updateGreenBird = () => {
    if(!isPaused){
        if(greenBird.x + greenBird.width < canvas.width){
            greenBird.x += 1;
        }else if(greenBird.x + greenBird.width === canvas.width){
            greenBird.x = 0;
        }
    }
    
}

// start the game loop
const startGame = () => {
    // create a redBird every second / thousand milliseconds

    createRedBirdInterval = setInterval(() => {
        createRedBird();
    },1000);

    moveGreenBirdInterval = setInterval(updateGreenBird,10);
    moveRedBirdInterval = setInterval(updateRedBirds,10);

    // start drawing loops
    draw();

    // start scoring
    scoreInterval = setInterval(() => {
        score += 1;
        scorebox.innerText = score;
    },1000)
  

   
}
  


// control the green bird
function controlGreenBirdFlight(event){
    if(!isPaused){
        if((event.key === 'ArrowUp') && (greenBird.y  > 20)){
            greenBird.y -= 10;
        }else if((event.key === 'ArrowDown') && ((greenBird.y + 20) < canvas.height)){
            greenBird.y += 10;
        }
    }
}

// collision logic
const collision = () => {
    redBirds.forEach((redBird) => {
        if ((greenBird.y + greenBird.height > redBird.y) && (greenBird.y < redBird.y + redBird.height) && (greenBird.x + greenBird.width > redBird.x) && (greenBird.x < redBird.x + redBird.width)){
            // alert('game over');
            // window.location.reload();
            
            // console.log("game-over")
            isPaused = true;
            document.querySelector('.game-over-notification').style.display = 'block';
            document.getElementById('your-score').innerText = score;

            clearInterval(createRedBirdInterval);
            clearInterval(moveGreenBirdInterval);
            clearInterval(moveRedBirdInterval);
            clearInterval(scoreInterval);

            document.querySelector('.restart-button').addEventListener('click',() => {
                window.location.reload()
            })
        }
    })
} 

// score logic



    

// start the game by pressing on the spacebar
document.addEventListener('keydown',(event) => {
    if(event.key === ' '){
        

        if(score === 0){
            isPaused = false;
            startGame();
            return;
        }

        // pause/resume intervals
        isPaused = !isPaused; 
           

        if(isPaused){
            clearInterval(createRedBirdInterval);
            clearInterval(moveGreenBirdInterval);
            clearInterval(moveRedBirdInterval);
            clearInterval(scoreInterval);
        }else{

            createRedBirdInterval = setInterval(() => {
                createRedBird();
            },1000);

            moveGreenBirdInterval = setInterval(updateGreenBird,10);
            moveRedBirdInterval = setInterval(updateRedBirds,10);
            scoreInterval = setInterval(() => {
                score += 1;
                scorebox.innerText = score;
            },1000)

        }

        // log the state
        console.log(isPaused ? "game paused" : "game resumed" )
      
    }

    // control green bird movement only when not paused
    if(!isPaused){
        controlGreenBirdFlight(event);
    }

}) 








