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
let soundfeld;
let ground;
let ball;
let canvas;
let ballImg;
let soundfeldImg;

let treppe1;
let treppe2;
let treppe3;
let treppe4;

function preload() {
  httpGet("svg/soundfeld.svg", "text", false, function (response) {
    // when the HTTP request completes ...
    // 1. parse the svg and get the path
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(response, "image/svg+xml");
    const svgPathElement = svgDoc.querySelector("path");
    // 2. setup all matter.js related things
    setupMatter(svgPathElement);
  });
}



function setupMatter(svgPathElement) {

  let canvas = createCanvas(1200, windowHeight * 2)
  canvas.parent('theCanvas')

  ballImg = loadImage('Bilder/ball.png');

  engine = Engine.create();



  ball = Bodies.circle(100, 50, 10, { restitution: 0 });

  ball.plugin.wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };


 /*  schiefe Ebene schwarz  */ground = Bodies.rectangle(148, 120, 230, 10, {
    isStatic: true, angle: Math.PI * 0.03
  });

  soundfeld = Bodies.fromVertices(340, 180, Matter.Svg.pathToVertices(svgPathElement), {
    isStatic: true, scale: 0, label: 'soundfeld'
  });


  rectMode(CORNER);
  //TREPPE
  /*  Treppe1  */ treppe1 = Bodies.rectangle(445, 325, 95, 6, {
    isStatic: true,
  });


  /*  Treppe2  */ treppe2 = Bodies.rectangle(463, 341, 125, 6, {
    isStatic: true,
  });

    /*  Treppe3  */ treppe3 = Bodies.rectangle(485, 355, 170, 6, {
    isStatic: true,
  });

    /*  Treppe4  */ treppe4 = Bodies.rectangle(515, 370, 230, 6, {
    isStatic: true,
  });



  //load sound
  hitsound = loadSound("Sound/kla4mix.mp3");
  hitsound.playMode('sustain');

  // setup hit sound
  Matter.Events.on(engine, 'collisionStart', function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "soundfeld" || bodyB.label === "soundfeld") {
      hitsound.play();

    } console.log(bodyA.label)
  });

  World.add(engine.world, [ball, ground, soundfeld, treppe1, treppe2, treppe3, treppe4, hitsound]);

  Engine.run(engine);
}

function draw() {
  clear();

  scale(2);

  drawSprite(ball, ballImg);


  noStroke();
  fill(0);
  drawBody(ground);

  scrollFollow(ball);


  // visualize collision
  const collided = Matter.SAT.collides(soundfeld, ball).collided;
  if (collided) {
    fill('red');
  } else {
    fill('pink');
  }

  rectMode(CORNER);
  drawBody(treppe1);
  drawBody(treppe2);
  drawBody(treppe3);
  drawBody(treppe4);
  /* drawBody(soundfeld); */




  /* fill(0);
  drawBody(ground); */

}

function keyPressed() {
  // is SPACE pressed?
  if (keyCode === 32) {
    let direction = 1; // circle runs left to right ->
    if ((ball.position.x - ball.positionPrev.x) < 0) {
      direction = 1;
      //direction = -1; circle runs right to left <-
    }
    // use current direction and velocity for the jump
    Body.applyForce(
      ball,
      { x: ball.position.x, y: ball.position.y },
      { x: (0.001 * direction), y: -0.005 }
    );
  }
}

function scrollFollow(matterObj) {
  if (insideViewport(matterObj) == false) {
    const $element = $('#parent');
    if ($element.is(':animated') == false) {
      $element.animate({
        /*     scrollLeft: ball.position.x, */
        scrollTop: ball.position.y
      }, 100);
    }
  }
}

function insideViewport(matterObj) {
  const x = matterObj.position.x;
  const y = matterObj.position.y;
  const pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
  const pageYOffset = window.pageYOffset || document.documentElement.scrollTop;
  if (x >= pageXOffset && x <= pageXOffset + windowWidth &&
    y >= pageYOffset && y <= pageYOffset + windowHeight) {
    return true;
  } else {
    return false;
  }
}
