Matter.use('matter-wrap');
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

let propeller;
let propeller2;
let angle = -100;
let angle2 = 5;

const drawBody = Helpers.drawBody;
const drawSprite = Helpers.drawSprite;

let hitsound;
let soundfeld;
let popup;
let ground;
let ground2;
let ball;
let canvas;
let ballImg;

let ordner1;
let ordner2;

let herzkurve;
let yu;
let direction = 1;

let seiter;
let winkel;

let treppe1;
let treppe2;
let treppe3;
let treppe4;

function preload() {
  let svgPathElement1, svgPathElement2, svgPathElement3;



  httpGet("svg/matter.svg", "text", false, function (response) {
    // when the HTTP request completes ...
    // 1. parse the svg and get the path
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(response, "image/svg+xml");
    const svgPathElement1 = svgDoc.querySelector("#Herzkurve");
    const svgPathElement2 = svgDoc.querySelector("#Soundfeld");
    const svgPathElement3 = svgDoc.querySelector("#Yu");
    // 2. setup all matter.js related things
    if (svgPathElement1 && svgPathElement2 && svgPathElement3) {
      setupMatter(svgPathElement1, svgPathElement2, svgPathElement3);
    }
  });
}

function setupMatter(svgPathElement1, svgPathElement2, svgPathElement3) {

  let canvas = createCanvas(1200, windowHeight * 2)
  canvas.parent('theCanvas')

  ballImg = loadImage('Bilder/ball.png');

  engine = Engine.create();

  ball = Bodies.circle(100, 50, 10, { restitution: 0 });

  ball.plugin.wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };

  //PROPELLER
  propeller = Bodies.rectangle(460, 360, 55, 6, {
    isStatic: true, angle: angle
  });
  //PROPELLER2
  propeller2 = Bodies.rectangle(460, 360, 55, 6, {
    isStatic: true, angle2: angle2
  });

  /*  popup  */
  popup = Bodies.rectangle(98, 73, 158, 10, {
    isStatic: true, angle: Math.PI * 0.035
  });

  /*  ground  */
  ground = Bodies.rectangle(260, 300, 485, 8, {
    isStatic: true,
  });


  ground2 = Bodies.rectangle(300, 600, 600, 8, {
    isStatic: true,
  });

  /* Soundfeld */
  soundfeld = Bodies.fromVertices(250, 150, Matter.Svg.pathToVertices(svgPathElement2), {
    isStatic: true, scale: 1, label: 'Soundfeld'
  });

  /* Buchstaben YU */
  yu = Bodies.fromVertices(60, 760, Matter.Svg.pathToVertices(svgPathElement3), {
    isStatic: true, scale: 1, label: 'Yu'
  });

  /* Herzkurve */
  console.log(svgPathElement1);
  herzkurve = Bodies.fromVertices(300, 440, Matter.Svg.pathToVertices(svgPathElement1), {
    isStatic: true, scale: 1, label: 'Herzkurve'
  });
  console.log(herzkurve);

  /*  Seite rechts  */
  seiter = Bodies.rectangle(526, 250, 5, 1200, {
    isStatic: true,
  });

  /*  Winkel  */
  winkel = Bodies.rectangle(523, 345, 30, 5, {
    isStatic: true, label: "winkel"
  });


//ORDNER
  /*  ordner1  */ ordner1 = Bodies.rectangle(450, 565, 60, 32, {
    isStatic: true,
  });

   /*  ordner2  */ ordner2 = Bodies.rectangle(55, 635, 60, 32, {
    isStatic: true,
  });


  //TREPPE
  /*  Treppe1  */ treppe1 = Bodies.rectangle(350  , 250, 95, 6, {
    isStatic: true,
  });


  /*  Treppe2  */ treppe2 = Bodies.rectangle(365, 262, 125, 6, {
    isStatic: true,
  });

  /*  Treppe3  */ treppe3 = Bodies.rectangle(388, 272, 170, 6, {
    isStatic: true,
  });

  /*  Treppe4 */  treppe4 = Bodies.rectangle(403, 282, 200, 6, {
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
    if (bodyA.label === "Soundfeld" || bodyB.label === "Soundfeld") {
      hitsound.play();
    }
    // change direction
    if (bodyA.label === "winkel" || bodyB.label === "winkel") {
      direction = -1;
    }

  });



  World.add(engine.world, [ball, treppe1, treppe2, treppe3, treppe4, soundfeld, propeller, propeller2, popup, ground, ground2, seiter, winkel, herzkurve, yu, ordner1, ordner2]);

  Engine.run(engine);
}

function draw() {

  clear();

  if (herzkurve == undefined) return;

  scale(2);

  drawSprite(ball, ballImg);


  noStroke();
  fill(0);


  scrollFollow(ball);


  // visualize collision
  const collided = Matter.SAT.collides(soundfeld, ball).collided;
   if (collided) {
    fill('red');
  } else {
    fill('pink');
  }

    drawBody(treppe1);
    drawBody(treppe2);
    drawBody(treppe3);
    drawBody(treppe4);
    drawBody(soundfeld);
    drawBody(propeller);
    drawBody(propeller2);
    drawBody(popup);
    drawBody(ground);
    drawBody(ground2);
    drawBody(seiter);
    drawBody(winkel);
    drawBody(herzkurve);
    drawBody (yu);
    drawBody(ordner1);
    drawBody(ordner2);

  // angle of propeller
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, 0.15);
  angle -= 0.07;

  // angle of propeller2
  Body.setAngle(propeller2, angle2);
  Body.setAngularVelocity(propeller2, 0.15);
  angle2 -= 0.07;



  /* fill(0);
  drawBody(ground); */

}

function keyPressed() {
  // is SPACE pressed?
  if (keyCode === 32) {


    // use current direction and velocity for the jump
    Body.applyForce(
      ball, {
      x: ball.position.x,
      y: ball.position.y
    }, {
      x: (0.001 * direction),
      y: -0.005
    }
    );
  }
}





function scrollFollow(matterObj) {
  const $element = $('#parent');
  if (insideViewport($element, matterObj) == false) {
    if ($element.is(':animated') == false) {
      $element.animate({
        scrollTop: ball.position.y
      }, 1000);
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

/* function insideViewport(element, matterObj) {
  const x = matterObj.position.x;
  const y = matterObj.position.y;
  const pageYOffset = 1200;
  if (y <= pageYOffset) {
    return true;
  } else {
    return false;
  }
} */



/*    scrollTop: (Math.floor((ball.position.y / 1200)) * 1200)
        }, 100); */
