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

let scrollId = null;
let engine;
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
let ground3;
let ground4;
let ball;
let canvas;
let ballImg;
let mauszeigerImg;

let ordner1;
let ordner2;
let abgrenzungordner1;
let abgrenzungordner2;

let pantone;
let pantonekl;

let herzkurve;
let mauszeiger;
let yu;
let strichlinie;
let direction = 1;

let seiter;
let seitel;
let winkel;

let tastatur1;
let tastatur2;
let tastatur3;
let tastatur4;

let treppe1;
let treppe2;
let treppe3;
let treppe4;

let portal;
let portal2;

let mausy = 530;
let mausstep = 5;

function preload() {
  let svgPathElement1, svgPathElement2, svgPathElement3, svgPathElement4;



  httpGet("svg/matter.svg", "text", false, function (response) {
    // when the HTTP request completes ...
    // 1. parse the svg and get the path
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(response, "image/svg+xml");
    const svgPathElement1 = svgDoc.querySelector("#Herzkurve");
    const svgPathElement2 = svgDoc.querySelector("#Soundfeld");
    const svgPathElement3 = svgDoc.querySelector("#Yu");
    const svgPathElement4 = svgDoc.querySelector("#Strichlinie");

    // 2. setup all matter.js related things
    if (svgPathElement1 && svgPathElement2 && svgPathElement3 && svgPathElement4) {
      setupMatter(svgPathElement1, svgPathElement2, svgPathElement3, svgPathElement4);
    }
  });
}

function setupMatter(svgPathElement1, svgPathElement2, svgPathElement3, svgPathElement4) {

  let canvas = createCanvas(1050, 1800)
  //let canvas = createCanvas(1200, windowHeight * 2)
  canvas.parent('theCanvas')



  ballImg = loadImage('Bilder/ball.png');
  mauszeigerImg = loadImage('Bilder/Mauszeiger.png');

  engine = Engine.create();

  ball = Bodies.circle(100, 50, 10, { restitution: 0 });

  ball.plugin.wrap = {
    min: { x: 0, y: 0 },
    max: { x: width, y: height }
  };

  mauszeiger = Bodies.rectangle(150, mausy, 100, 100, { restitution: 0 });

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
    isStatic: true, label: 'ground2'
  });

  ground3 = Bodies.rectangle(300, 780, 600, 8, {
    isStatic: true, label: 'ground3'
  });

  ground4 = Bodies.rectangle(300, 905, 600, 8, {
    isStatic: true, label: 'ground3'
  });

  //PANTONE
  pantone = Bodies.rectangle(333, 722, 60, 60, {
    isStatic: true, label: 'pantone'
  });
  pantonekl = Bodies.rectangle(330, 716, 25, 20, {
    isStatic: true, label: 'pantonekl'
  });


  /* Soundfeld */
  soundfeld = Bodies.fromVertices(250, 150, Matter.Svg.pathToVertices(svgPathElement2), {
    isStatic: true, scale: 1, label: 'Soundfeld'
  });

  /* Buchstaben YU */
  yu = Bodies.fromVertices(70, 760, Matter.Svg.pathToVertices(svgPathElement3), {
    isStatic: true, scale: 1, label: 'Yu'
  });

  /* Strichlinie */
  strichlinie = Bodies.fromVertices(140, 880, Matter.Svg.pathToVertices(svgPathElement4), {
    isStatic: true, scale: 1, label: 'Strichlinie'
  }); console.log(strichlinie)




  /* Herzkurve */
  console.log(svgPathElement1);
  herzkurve = Bodies.fromVertices(300, 440, Matter.Svg.pathToVertices(svgPathElement1), {
    isStatic: true, scale: 1, label: 'Herzkurve'
  });
  console.log(herzkurve);

  /*  Seite rechts  */
  seiter = Bodies.rectangle(526, 250, 5, 1500, {
    isStatic: true,
  });

  /*  Seite links  */
  seitel = Bodies.rectangle(0, 250, 5, 1500, {
    isStatic: true,
  });

  /*  Winkel  */
  winkel = Bodies.rectangle(523, 345, 30, 5, {
    isStatic: true, label: "winkel"
  });

  /*  Portal  */
  portal = Bodies.rectangle(470, 750, 30, 5, {
    isStatic: true, label: "portal"
  });

  /*  Portal2  */
  portal2 = Bodies.rectangle(30, 800, 30, 5, {
    isStatic: true, label: "portal2"
  });



/*  abgrenzung ordner 1  */ abgrenzungordner1 = Bodies.rectangle(480, 550, 2, 60, {
    isStatic: true, label: "ordner1"
  });




//ORDNER
  /*  ordner1  */ ordner1 = Bodies.rectangle(450, 550, 60, 2, {
    isStatic: true, label: "ordner1"
  });

   /*  ordner2  */ ordner2 = Bodies.rectangle(55, 620, 60, 2, {
    isStatic: true, label: "ordner2"
  });

  //Tastatur
  /*  tastatur1  */ tastatur1 = Bodies.rectangle(117, 710, 25, 8, {
    isStatic: true,
  });

  /*  tastatur2  */ tastatur2 = Bodies.rectangle(150, 710, 25, 8, {
    isStatic: true,
  });

  /*  tastatur3  */ tastatur3 = Bodies.rectangle(203, 710, 75, 8, {
    isStatic: true,
  });

  /*  tastatur4  */ tastatur4 = Bodies.rectangle(255, 710, 25, 8, {
    isStatic: true,
  });


  //TREPPE
  /*  Treppe1  */ treppe1 = Bodies.rectangle(350, 250, 95, 6, {
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
      scroll(0, 600, 30)
    }

    if (bodyA.label === "ground2" || bodyB.label === "ground2") {
      direction = 1;
    }

    if (bodyA.label === "ordner1" || bodyB.label === "ordner1") {
      Body.setPosition(ball, { x: 55, y: 635 });
      scroll(0, 1210, 30)
    }

    if (bodyA.label === "portal" || bodyB.label === "portal") {
      Body.setPosition(ball, { x: 30, y: 805 });

    }

  });



  World.add(engine.world, [ball, treppe1, treppe2, treppe3, treppe4, soundfeld, propeller, propeller2, popup, ground, ground2, seiter, seitel, winkel, herzkurve, yu, strichlinie, ordner1, ordner2, tastatur1, tastatur2, tastatur3, tastatur4, portal, portal2, ground3, ground4, pantonekl, pantone, abgrenzungordner1]);

  Engine.run(engine);
}

function draw() {

  clear();

  if (herzkurve == undefined) return;

  scale(2);

  drawSprite(ball, ballImg);
  drawSprite(mauszeiger, mauszeigerImg);

  noStroke();
  fill(0);

  //scrollFollow(ball);


  // visualize collision
  /* const collided = Matter.SAT.collides(soundfeld, ball).collided;
  if (collided) {
    fill('red');
  } else {
    fill('pink');
  } */



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
  drawBody(ground3);
  drawBody(ground4);
  drawBody(seiter);
  drawBody(seitel);
  drawBody(winkel);
  drawBody(herzkurve);
  drawBody(yu);
  drawBody(strichlinie);
  drawBody(ordner1);
  drawBody(ordner2);
  drawBody(abgrenzungordner1);
  drawBody(tastatur1);
  drawBody(tastatur2);
  drawBody(tastatur3);
  drawBody(tastatur4);
  drawBody(portal);
  drawBody(portal2);
  //drawBody(pantone);

  const collided = Matter.SAT.collides(pantone, ball).collided;
  if (collided) {
    fill('magenta');
  } else {
    fill('black');
  }
  drawBody(pantonekl);


  // angle of propeller
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, 0.15);
  angle -= 0.07;

  // angle of propeller2
  Body.setAngle(propeller2, angle2);
  Body.setAngularVelocity(propeller2, 0.15);
  angle2 -= 0.07;

  Body.setPosition(mauszeiger, { x: 150, y: mausy });
  mausy += mausstep
  if (mausy < 510 || mausy > 570) {
    mausstep = - mausstep
  }



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

function scroll(x, y, speed) {
  // stoppt eventuell existierendes Scrollen
  if (scrollId) {
    clearInterval(scrollId)
  }
  // Neues Scrollen festlegen - läuft bis die Zielposition erreicht ist,
  // bzw. der Browser nicht mehr scrollen kann
  let moved = true;
  let element = document.getElementById('parent')
  scrollId = setInterval(function () {
    if (moved) {
      let posX = element.scrollLeft
      let posY = element.scrollTop
      element.scrollTo(element.scrollLeft + Math.min(speed, Math.abs(x - element.scrollLeft)) * Math.sign(x - element.scrollLeft), element.scrollTop + Math.min(speed, Math.abs(y - element.scrollTop)) * Math.sign(y - element.scrollTop))
      moved = (posX != element.scrollLeft || posY != element.scrollTop)
      console.log(scrollId, element.scrollLeft, element.scrollTop)
    } else {
      clearInterval(scrollId)
      console.log("DONE")
    }
  }, 40)
}
