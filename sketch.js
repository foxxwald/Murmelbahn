const Engine = Matter.Engine
const Render = Matter.Render
const World = Matter.World
const Bodies = Matter.Bodies
const Body = Matter.Body
const Vertices = Matter.Vertices
const Svg = Matter.Svg
const Composites = Matter.Composites
const Mouse = Matter.Mouse
const MouseConstraint = Matter.MouseConstraint

let engine
let circle;
let obstacle;
let slide;


const drawBody = Helpers.drawBody;
const drawSprite = Helpers.drawSprite;

let hitsound;
let soundbox;
let ground;
let ball;
let canvas;
let ballImg;



function setup() {

  let canvas = createCanvas(windowWidth, windowHeight)
  canvas.parent('theCanvas')

  engine = Engine.create();

  ballImg = loadImage('Bilder/ball.svg');

  ball = Bodies.circle(100, 50, 40, {
    restitution: 0
  });

  ball.plugin.wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };


 /*  schiefe Ebene schwarz  */ground = Bodies.rectangle(148, 120, 230, 10, {
    isStatic: true, angle: Math.PI * 0.01
  });

   /*  soundkasten  */ soundbox = Bodies.rectangle(340, 120, 110, 50, {
    isStatic: true,
  });

  //load sound
  hitSound = loadSound("sound/flutinstrumental.mp3");
  hitSound.playMode('sustain');

  // setup hit sound
  Matter.Events.on(engine, 'collisionStart', function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "soundbox" || bodyB.label === "soundbox") {
      hitSound.play();
    }
  });

  World.add(engine.world, [ball, ground, soundbox]);

  Engine.run(engine);
}

function draw() {
  clear();

  drawSprite(ball, ballImg);

  noStroke();
  fill(0);
  drawBody(ground);


  // visualize collision
  const collided = Matter.SAT.collides(soundbox, ball).collided;
  if (collided) {
    fill('red');
  } else {
    fill('white');
  }

  drawBody(soundbox);


  /* fill(0);
  drawBody(ground); */

}

function keyPressed() {
  // is SPACE pressed?
  if (keyCode === 32) {
    let direction = 1; // circle runs left to right ->
    if ((ball.position.x - ball.positionPrev.x) < 0) {
      direction = -1; // circle runs right to left <-
    }
    // use current direction and velocity for the jump
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: (0.01 * direction) + ball.velocity.x / 100, y: -0.1 }
    );
  }
}