const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
// Add a rectangle at (10,10) with size 100*100 pixels
let rectangle = {
    x : 10,
    y: 10,
    width: 100,
    height : 100
}
ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height)
console.log(rectangle)

document.addEventListener('keydown',(event) => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(event.key === "ArrowRight"){
        if((rectangle.x + 130) < canvas.width){
            rectangle.x = rectangle.x + 50;  
        }      
    }
    
    if(event.key === "ArrowLeft"){   
        if(rectangle.x  > 20){
            rectangle.x = rectangle.x - 50;  
        }
        
    }

    if(event.key === "ArrowUp"){
        if(rectangle.y  > 50){
            rectangle.y = rectangle.y - 50;
        }       
    }

    if(event.key === "ArrowDown"){
        if(rectangle.y + 120 < canvas.height){
            rectangle.y = rectangle.y + 50;  
        }
    }
        
    ctx.fillRect(rectangle.x,rectangle.y,rectangle.width,rectangle.height)
    console.log(rectangle)
})


