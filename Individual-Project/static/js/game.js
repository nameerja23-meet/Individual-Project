const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 720

class Arrows{
    constructor({x,y,sprite}){
        this.width = 100
        this.height = 100
        this.velocity = 10
        this.pos ={
            x,
            y
        }
        this.sprite= sprite
    }
    update(){
        this.pos.y += this.velocity.y
        context.drawImage(this.sprite, this.pos.x, this.pox.y, this.width, this.height)
    }
}

function newImage(imgSrc){
	img = new Image()
	img.src = imgSrc
	return img
} 

const leftArrow = newImage('static/img/left_arrow.png')
const test = newImage('static/img/test.png')
const arrows = [new Arrows({
    x:200,
    y:200,
    sprite: test
})
]

function animate(){
	requestAnimationFrame(animate)
	context.fillStyle="white"
	context.fillRect(0, 0, canvas.width, canvas.height)

    arrows.forEach(arrow =>{
        arrow.update()
    })
}
