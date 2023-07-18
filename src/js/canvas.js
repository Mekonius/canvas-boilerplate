import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05
    //size of the circle
    this.chaos = randomIntFromRange(50, 120);
  }

  draw(oldPos) {
    c.beginPath()
    c.strokeStyle = this.color
    c.lineWidth = this.radius

    c.save()
    c.moveTo(oldPos.x, oldPos.y)
    c.lineTo(this.x, this.y)
    c.stroke()
    c.closePath()
    c.shadowColor = this.color;
    c.shadowBlur = 100;

    c.restore()
  }

  update() {
    const oldPos = {x: this.x, y: this.y};
    this.radians += this.velocity
    this.x = canvas.width / 2 + Math.cos(this.radians) * 
      this.chaos * 0 + Math.cos(this.radians) * this.chaos * Math.sin(-this.radians) * 2.1;
    this.y = canvas.height / 2  + Math.sin(this.radians) *
      this.chaos * 3 + Math.sin(this.radians) / this.chaos * Math.cos(-this.radians) * 2.1;
    this.draw(oldPos)
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 50; i++) {
    const radius = (Math.random() * 2);
    particles.push(new Particle(canvas.width / 2, canvas.height /2, radius * 2, randomColor(colors)));
  }
  console.log(particles);
  canvas.style.backgroundColor = 'black';
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  //c.clearRect(0, 0, canvas.width, canvas.height)
  c.fillStyle = 'rgba(0, 0, 0, 0.05)'
  c.fillRect(0, 0, canvas.width, canvas.height)
   particles.forEach(p => {
    p.update()
  })
}

init()
animate()
