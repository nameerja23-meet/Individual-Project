const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width =window.outerWidth
canvas.height = window.outerHeight
console.log(window.height)
console.log(window.outerWidth)
class Arrows{
    constructor({x,y, sprite, direction}){
        this.width = 100
        this.height = 100
        this.velocity = 4
        this.pos ={
            x,
            y
        }
        this.sprite= sprite
        this.direction = direction
    }
    draw(){
        context.drawImage(this.sprite, this.pos.x, this.pos.y, this.width, this.height)
    }
    update(){
        this.pos.y += this.velocity
    }
}

function newImage(imgSrc){
	img = new Image()
	img.src = imgSrc
	return img
} 
const blackBg = newImage('static/img/black_screen.jpg')
const leftArrow = newImage('static/img/left_arrow.png')
const rightArrow = newImage('static/img/right_arrow.png')
const downArrow = newImage('static/img/down_arrow.png')
const upArrow = newImage('static/img/up_arrow.png')
const leftArrowOutline = newImage('static/img/left_arrow_outline.png')
const rightArrowOutline = newImage('static/img/right_arrow_outline.png')
const downArrowOutline = newImage('static/img/down_arrow_outline.png')
const upArrowOutline = newImage('static/img/up_arrow_outline.png')
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

const arrows = []

function generateArrow(){
    switch(getRandomInt(1,5)){
        case 1:
            img = leftArrow
            x = 100
            direction = "left"
            break

        case 2:
            img = rightArrow
            x = 400
            direction = "right"
            break
        
        case 3:
            x = 700
            img = downArrow
            direction = "down"
            break
        
        case 4:
            img = upArrow
            x = 1000
            direction = "up"
            break
    }
    const arrow = new Arrows({
        x:x,
        y:0,
        sprite: img,
        direction: direction})
    arrows.push(arrow)
    console.log(arrows)
}


let time = 0
let score = 0
let lives = 3
context.font = "50px serif"
let keyPressed = ''
document.addEventListener('keydown', (event) => {
    keyPressed = event.key;
  })

function animate(){
	requestAnimationFrame(animate)
	context.fillStyle="white"
	context.fillRect(0, 0, canvas.width, canvas.height)


    context.drawImage(blackBg,0,0, 1280,720 )
    context.drawImage(leftArrowOutline, 100, 500, 100, 100)
    context.drawImage(rightArrowOutline, 400, 500, 100, 100)
    context.drawImage(downArrowOutline, 700, 500, 100, 100)
    context.drawImage(upArrowOutline, 1000, 500, 100, 100)
    if(lives!=0){
        if((time%60) == 0){
            generateArrow()
        }
        arrows.forEach(arrow => {
            arrow.draw()
            arrow.update()
            if (arrow.pos.y > 560){
                arrows.shift()
                lives -=1
            }
        })
        if ((arrows[0].pos.y<550) && (arrows[0].pos.y > 450) && (arrows[0].direction == "left") && (keyPressed == 'ArrowLeft')){
            arrows.shift()
            score +=1
        }
        if ((arrows[0].pos.y<550) && (arrows[0].pos.y > 450) && (arrows[0].direction == "right") && (keyPressed == 'ArrowRight')){
            console.log("test")
            arrows.shift()
            score +=1
        }
        if ((arrows[0].pos.y<600) && (arrows[0].pos.y > 500) && (arrows[0].direction == "down" && (keyPressed == 'ArrowDown'))){
            console.log("test")
            arrows.shift()
            score+=1
        }
        if ((arrows[0].pos.y<600) && (arrows[0].pos.y > 500) && (arrows[0].direction == "up") && (keyPressed == 'ArrowUp')){
            console.log("test")
            arrows.shift()
            score +=1
        }
        time +=2
        context.fillText("Score:" +score.toString(), 1090, 50)
    }
    else{
        context.fillText("GAME OVER", 525, 360)
    }
    
}
animate()



