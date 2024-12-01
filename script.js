const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
// Add a rectangle at (10,10) with size 100*100 pixels
let rectangle = {
    x : 10,
    y: 200,
    width: 20,
    height : 20
}
ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height)
console.log(rectangle)

document.addEventListener('keydown',(event) => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(event.key === "ArrowRight"){
        if((rectangle.x + 10) < canvas.width){
            rectangle.x = rectangle.x + 10;  
        }      
    }
    
    if(event.key === "ArrowLeft"){   
        if(rectangle.x  > (rectangle.width + 10)){
            rectangle.x = rectangle.x - 10;  
        }
    }

    if(event.key === "ArrowUp"){
        if(rectangle.y   > (rectangle.height + 10)){
            rectangle.y = rectangle.y - 10;
        }       
    }

    if(event.key === "ArrowDown"){
        if((rectangle.y + 10) < canvas.height){
            rectangle.y = rectangle.y + 10;  
        }
    }
        
    ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height)
    console.log(rectangle)
})


function flyRight(){
    const intervalId = setInterval(() => {
        if(rectangle.x + rectangle.width < canvas.width){
            rectangle.x += 5;
            ctx.clearRect(0,0,canvas.width,canvas.height)
            ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height)
        }else{
            clearInterval(intervalId);
        }
       
    },100)
}

document.addEventListener('keydown',(event) => {
    
       
        flyRight();
        
   
})

