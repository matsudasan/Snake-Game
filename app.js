const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const square = 20
canvas.width = square * 30
canvas.height = square * 30

const snake = {
    x: 0,
    y: 0,
    dx: 1,
    dy: 0,
    body: [{ x: 0, y: 0 }],
    move: function () {
        ctx.fillStyle = "#7fff00"
        this.body.forEach(ele => {
            ctx.fillRect(ele.x, ele.y, square - 2, square - 2)
        })
        this.x += this.dx * square
        this.y += this.dy * square
        const head = { x: this.x, y: this.y }
        for (let i = 0; i < snake.body.length - 1; i++) {
            if (snake.body[i].x === head.x && snake.body[i].y === head.y) {
                GameOver()
            }
        }
        if (head.x < 0 || head.y < 0 || head.x > canvas.width || head.y > canvas.height) {
            GameOver()
        }
        this.body.shift()
        this.body.push(head)
    }
}

const fruit = {
    x: 0,
    y: 0,
    show: function () {
        ctx.fillStyle = "red"
        ctx.fillRect(this.x, this.y, square, square)
    }
}

const Init = () => {
    let x=Math.floor(Math.random() * 30) * square
    let y= Math.floor(Math.random() * 30) * square
    while(AddFruit(x,y)){
        if(x<=square*28){
            x+=x+20
        }else if(y<=square*28){
           y+=y+20
        }
    }
    fruit.x =x
    fruit.y =y
}
const AddFruit=(x,y)=>{
    for(let i=0; i<snake.body.length;i++){
        console.log(snake.body[i])
        if(x===snake.body[i].x && y===snake.body[i].y){
            return true
        }
    }
    return false
}
const Eat = () => {
    if (snake.x === fruit.x && snake.y === fruit.y) {
        const head = {
            x: snake.x,
            y: snake.y
        }
        snake.body.push(head)
        Init()
    }
}

const GameOver = () => {
    clearInterval(Game)
    ctx.font = '50pt Arial'
    const metrics = ctx.measureText('GAME OVER').width
    ctx.strokeStyle = 'yellow'
    ctx.strokeText('GAME OVER', canvas.width / 2 - metrics / 2, canvas.height / 2)
    ctx.fillStyle = "black"
    ctx.fillText('GAME OVER', canvas.width / 2 - metrics / 2, canvas.height / 2)
}

const Draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snake.move()
    fruit.show()
    Eat()
}
const Game = setInterval(Draw, 1000 / 10)

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") {
        snake.dx = 0
        snake.dy = -1
    } else if (e.key === "ArrowRight") {
        snake.dx = 1
        snake.dy = 0
    } else if (e.key === "ArrowDown") {
        snake.dx = 0
        snake.dy = 1
    } else if (e.key === "ArrowLeft") {
        snake.dx = -1
        snake.dy = 0
    }
})

Init()