let ball;




function setupMatter() {

    let canvas = createCanvas(1050, 1800)
    //let canvas = createCanvas(1200, windowHeight * 2)
    canvas.child('theCanvas')

    engine = Engine.create();

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

    World.add(engine.world, [ball]);
    Engine.run(engine);

}

function draw() {
    /* background(100); */
    drawBody(ball);
}