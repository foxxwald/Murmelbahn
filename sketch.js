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

let decke;
let ground;
let ground2;
let ground3;
let ground4;

let ball;
let canvas;

let ballImg;
let mauszeigerImg;
let mülleimerImg;

let ordner1;
let ordner2;
let abgrenzungordner1;
let abgrenzungordner2;

let pantone;
let pantonekl;

let herzkurve;
let mauszeiger;
let mülleimerbild;
let yu;
let strichlinie;


let winkelk;
let winkelk2;
let winkelk3;

let seiter;
let seitel;
let winkel;

let portal;
let portal2;
let abgrenzungtoogel1;
let abgrenzungtoogel2;

let mülleimer;
let mülleimer2;
let mülleimer3;
let mülleimer4;

let tastatur1;
let tastatur2;
let tastatur3;
let tastatur4;

let treppe1;
let treppe2;
let treppe3;
let treppe4;

let kasten;
let kasten2;
let kasten3;
let kasten4;

let direction = 1;

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
  canvas.parent('theCanvas')



  ballImg = loadImage('Bilder/ball.png');
  mauszeigerImg = loadImage('svg/Mauszeiger.svg');
  mülleimerImg = loadImage('svg/Mülleimerbild.svg');

  engine = Engine.create();

  //BALL
  ball = Bodies.circle(60, 7, 10, {
    restitution: 0
  });

  ball.plugin.wrap = {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: width,
      y: height
    }
  };


  //MAUSZEIGER
  mauszeiger = Bodies.rectangle(150, mausy, 30, 30, {
    isStatic: true
  });


  //KÄSTEN TABS
  kasten = Bodies.rectangle(278, 812, 80, 3, {
    restitution: 0,
    isStatic: true
  });

  kasten2 = Bodies.rectangle(338, 825, 80, 3, {
    restitution: 0,
    isStatic: true
  });

  kasten3 = Bodies.rectangle(393, 842, 80, 3, {
    restitution: 0,
    isStatic: true
  });

  kasten4 = Bodies.rectangle(443, 857, 50, 3, {
    restitution: 0,
    isStatic: true
  });



  //PROPELLER
  propeller = Bodies.rectangle(460, 360, 55, 6, {
    isStatic: true,
    angle: angle
  });

  //PROPELLER2
  propeller2 = Bodies.rectangle(460, 360, 55, 6, {
    isStatic: true,
    angle: angle2
  });

  //POPUP
  popup = Bodies.rectangle(98, 73, 158, 10, {
    isStatic: true,
    angle: Math.PI * 0.035
  });


  //DECKE 
  decke = Bodies.rectangle(300, 15, 450, 8, {
    isStatic: true,
  });

  //BÖDEN
  ground = Bodies.rectangle(260, 300, 485, 8, {
    isStatic: true,
  });

  ground2 = Bodies.rectangle(300, 600, 600, 8, {
    isStatic: true,
    label: 'ground2'
  });

  ground3 = Bodies.rectangle(300, 770, 600, 8, {
    isStatic: true,
    label: 'ground3'
  });

  ground4 = Bodies.rectangle(300, 905, 600, 8, {
    isStatic: true,
    label: 'ground3'
  });


  //PANTONE FELD
  pantone = Bodies.rectangle(333, 722, 60, 60, {
    isStatic: true,
    label: 'pantone'
  });
  pantonekl = Bodies.rectangle(330.5, 716, 25, 19, {
    isStatic: true,
    label: 'pantonekl'
  });

  //SVG

  //SOUNDFELD
  soundfeld = Bodies.fromVertices(215, 150, Matter.Svg.pathToVertices(svgPathElement2), {
    isStatic: true,
    scale: 1,
    label: 'Soundfeld'
  });

  //YU BUCHSTABEN
  yu = Bodies.fromVertices(70, 760, Matter.Svg.pathToVertices(svgPathElement3), {
    isStatic: true,
    scale: 1,
    label: 'Yu'
  });

  //STRICHLINIE
  strichlinie = Bodies.fromVertices(133, 868, Matter.Svg.pathToVertices(svgPathElement4), {
    isStatic: true,
    scale: 1,
    label: 'Strichlinie'
  });

  //HERZKURVE
  herzkurve = Bodies.fromVertices(300, 440, Matter.Svg.pathToVertices(svgPathElement1), {
    isStatic: true,
    scale: 1,
    label: 'Herzkurve'
  });



  //SEITE RECHTS
  seiter = Bodies.rectangle(526, 250, 5, 1500, {
    isStatic: true,
  });

  //SEITE LINKS
  seitel = Bodies.rectangle(0, 250, 5, 1500, {
    isStatic: true,
  });

  //WINKEL SCROLLBAR
  winkel = Bodies.rectangle(523, 345, 30, 5, {
    isStatic: true,
    label: "winkel"
  });

  //PORTAL TOOGLE
  portal = Bodies.rectangle(470, 750, 30, 5, {
    isStatic: true,
    label: "portal"
  });

  portal2 = Bodies.rectangle(30, 800, 30, 5, {
    isStatic: true,
    label: "portal2"
  });
  //ABGRENZUNG TOOGLE 1
  abgrenzungtoogel1 = Bodies.rectangle(455, 760, 2, 30, {
    isStatic: true,

  });

  //ABGRENZUNG TOOGLE 2
  abgrenzungtoogel2 = Bodies.rectangle(485, 700, 2, 170, {
    isStatic: true,

  });



  //ORDNER
  ordner1 = Bodies.rectangle(450, 550, 60, 2, {
    isStatic: true,
    label: "ordner1"
  });

  ordner2 = Bodies.rectangle(55, 620, 60, 2, {
    isStatic: true,
    label: "ordner2"
  });

  //ABGRENZUNG ORDNER 1
  abgrenzungordner1 = Bodies.rectangle(480, 550, 2, 100, {
    isStatic: true,

  });

  //ABGRENZUNG ORDNER 2
  abgrenzungordner2 = Bodies.rectangle(420, 575, 2, 50, {
    isStatic: true,

  });




  //MÜLLEIMER
  mülleimer = Bodies.rectangle(475, 895, 2, 78, {
    isStatic: true,

  });

  mülleimer2 = Bodies.rectangle(503, 895, 2, 190, {
    isStatic: true,

  });

  mülleimer3 = Bodies.rectangle(490, 899, 28, 2, {
    isStatic: true,

  });

  mülleimer4 = Bodies.rectangle(515, 857, 24, 2, {
    isStatic: true,

  });



  //TASTATUR

  tastatur1 = Bodies.rectangle(117, 710, 25, 8, {
    isStatic: true,
  });
  tastatur1.restitution = 1;


  tastatur2 = Bodies.rectangle(150, 710, 25, 8, {
    isStatic: true,
  });

  tastatur2.restitution = 1;


  tastatur3 = Bodies.rectangle(203, 710, 75, 8, {
    isStatic: true, restitution: 0.8,
  });

  tastatur3.restitution = 1;


  tastatur4 = Bodies.rectangle(255, 710, 25, 8, {
    isStatic: true,
  });

  tastatur4.restitution = 1;


  //TREPPE
  treppe1 = Bodies.rectangle(350, 250, 95, 6, {
    isStatic: true,
  });

  treppe2 = Bodies.rectangle(365, 262, 125, 6, {
    isStatic: true,
  });

  treppe3 = Bodies.rectangle(388, 272, 170, 6, {
    isStatic: true,
  });

  treppe4 = Bodies.rectangle(403, 282, 200, 6, {
    isStatic: true,
  });





  //LOAD SOUND
  hitsound = loadSound("Sound/Test.mp3");
  hitsound.playMode('sustain');

  // SETUP HIT SOUND
  Matter.Events.on(engine, 'collisionStart', function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;
    if (bodyA.label === "Soundfeld" || bodyB.label === "Soundfeld") {
      hitsound.play();
    }
    // CHANGE DIRECTION
    if (bodyA.label === "winkel" || bodyB.label === "winkel") {
      direction = -1;
      scroll(0, 600, 30)
    }

    if (bodyA.label === "ground2" || bodyB.label === "ground2") {
      direction = 1;
    }

    // PORTAL & SCROLL
    if (bodyA.label === "ordner1" || bodyB.label === "ordner1") {
      Body.setPosition(ball, {
        x: 55,
        y: 635
      });
      scroll(0, 1210, 30)
    }

    if (bodyA.label === "portal" || bodyB.label === "portal") {
      Body.setPosition(ball, {
        x: 30,
        y: 805
      });
    }

  });




  World.add(engine.world, [ball, treppe1, treppe2, treppe3, treppe4, soundfeld, propeller, propeller2, popup, ground, ground2, seiter, seitel, winkel, herzkurve, yu, strichlinie, ordner1, ordner2, tastatur1, tastatur2, tastatur3, tastatur4, portal, portal2, ground3, ground4, pantonekl, pantone, abgrenzungordner1, abgrenzungordner2, decke, mauszeiger, abgrenzungtoogel1, abgrenzungtoogel2, kasten, kasten2, kasten3, kasten4, mülleimer, mülleimer2, mülleimer3, mülleimer4]);



  Engine.run(engine);


  //BALL POSITION
  /* Body.setPosition(ball, { x: 100, y: 600 });
  scroll(0, 1210, 30); */
}




function draw() {

  clear();

  if (herzkurve == undefined) return;

  scale(2);


  drawSprite(ball, ballImg);
  drawSprite(mauszeiger, mauszeigerImg);
  image(mülleimerImg, 476, 858);

  noStroke();
  fill(0);

  drawBody(propeller);
  drawBody(propeller2);






  /*   drawBody(kasten);
    drawBody(kasten2);
    drawBody(kasten3);
    drawBody(kasten4);

  
  drawBody(popup);

  drawBody(soundfeld);
    drawBody(herzkurve);
    drawBody(yu);
    drawBody(strichlinie);
  
  
    drawBody(decke);
    drawBody(ground);
    drawBody(ground2);
    
    drawBody(ground4);
    
    drawBody(treppe1);
  drawBody(treppe2);
  drawBody(treppe3);
  drawBody(treppe4);
  drawBody(ground3);
  
    drawBody(seiter);
    drawBody(seitel);
    drawBody(winkel);
  
   
    drawBody(ordner1);
    drawBody(ordner2);
    drawBody(abgrenzungordner1);
    drawBody(abgrenzungordner2);
  
    drawBody(tastatur1);
    drawBody(tastatur2);
    drawBody(tastatur3);
    drawBody(tastatur4);
  
    drawBody(portal);
    drawBody(portal2);
    drawBody(abgrenzungtoogel2);
    drawBody(abgrenzungtoogel1);
  
    drawBody(mülleimer);
    drawBody(mülleimer2);
    drawBody(mülleimer3);
    drawBody(mülleimer4); */




  //PANTONE COLLISION
  const collided = Matter.SAT.collides(pantone, ball).collided;
  if (collided) {
    fill('magenta');
  } else {
    fill('black');
  }
  drawBody(pantonekl);


  // ANGEL PROPELLER 1
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, 0.15);
  angle -= 0.07;

  // ANGEL PROPELLER 2
  Body.setAngle(propeller2, angle2);
  Body.setAngularVelocity(propeller2, 0.15);
  angle2 -= 0.07;


  //BEWEGUNG MAUSZEIGER
  Body.setPosition(mauszeiger, {
    x: 150,
    y: mausy
  });
  mausy += mausstep
  if (mausy < 510 || mausy > 570) {
    mausstep = -mausstep
  }

}


//SPRINGEN DURCH LEERTASTE
function keyPressed(event) {
  // is SPACE pressed?
  if (keyCode === 32) {
    event.preventDefault()


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


//SCROLLING
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

    }
  }, 40)
}
