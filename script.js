const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// ctx.fillStyle = 'green';

const redBirds = []; //array to store red bird objects
let redBirdsFlying = false; //flag to prevent multiple intervals
let greenBirdFlying = false;

// create a Green Bird on the left

const greenBird = {
    x : 20,
    y : 240,
    width:20,
    height:20,
    color:'green',
};

const createRedBird = () => {
    let redBird = {
        x : 1070,
        y : Math.floor(Math.random()*(canvas.height-20)),
        width: 20,
        height:20,
        color:'red',
    }
    redBirds.push(redBird);
}

// Draw red birds
const drawRedBirds = () => {
    // clear everything on the screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    redBirds.forEach((redBird) => {
        ctx.fillStyle = redBird.color;
        ctx.fillRect(redBird.x,redBird.y,redBird.width,redBird.height);
    })
}

// move all the red birds to the right
// give different speeds to each redBird
const redBirdsStartFlying = () => {
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    if(!redBirdsFlying){
        redBirdsFlying = true;
        setInterval(() => {
            redBirds.forEach((redBird) => {
                if((redBird.x + redBird.width) > 20){
                    redBird.x -= 1;
                    drawRedBirds();
                }
                // if((redBird.y + redBird.height) < canvas.height){
                //     redBird.y += 5;
                // }
            });
            
        },10)
    }
}



// Draw a green bird
const drawGreenBird = () => {
    // clear everything on the screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = greenBird.color;
    ctx.fillRect(greenBird.x,greenBird.y,greenBird.width,greenBird.height);
} 

// green bird start flying to the right at a steady pace
const greenBirdStartFlying = () => {
    // ctx.clearRect(0,0,canvas.width,canvas.height);
    if(!greenBirdFlying){
        greenBirdFlying = true;
        setInterval(() => {
            if(greenBird.x + greenBird.width < canvas.width){
                greenBird.x += 1;
                drawGreenBird();
            }  
        },10)
    }
} 


// event listeners
document.addEventListener('keydown',(event) => {
    if(event.key === ' '){
        // drawGreenBird();
        greenBirdStartFlying();
        setInterval(() => {
            createRedBird();
            if(redBirds.length === 1){  //so redBirds start flying when their number is just 1, and as this interval is never cleared with clearInterval()  they just keep flying,
                redBirdsStartFlying();
            }
        },2000)
    }
    // if(event.key.startsWith('Arrow')){
    //     let movement = 10;   
    // }

    
})






