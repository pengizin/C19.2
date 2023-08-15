var torre, imagemTorre;
var porta, imagemPorta, portaGrupo;
var grade, imagemGrade, gradeGrupo;
var fantasma, imagemFantasma;
var blocoInvisivel, blocoInvisivelGp;
var gameState = "play"

function preload() {
  imagemTorre = loadImage("tower.png");
  imagemPorta = loadImage("door.png");
  imagemGrade = loadImage("climber.png");
  imagemFantasma = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  //spookySound.loop();
  torre = createSprite(300, 300);
  torre.addImage("tower", imagemTorre);
  torre.velocityY = 1;

  fantasma = createSprite(200, 200, 50, 50);

  fantasma.addImage(imagemFantasma);

  fantasma.scale = 0.3;

  portaGrupo = new Group();

  gradeGrupo = new Group();

  blocoInvisivelGp = new Group();


}

function draw() {
  background(0);

  if (gameState === "play") {

    if (torre.y > 400) {
      torre.y = 300
    }

    if (keyDown("left_arrow")) {
      fantasma.x = fantasma.x - 3;

    }

    if (keyDown("right_arrow")) {
      fantasma.x = fantasma.x + 3;

    }

    if (keyDown("space")) {
      fantasma.velocityY = -10;

    }

    fantasma.velocityY += 0.8;



    createAll();


    if (fantasma.isTouching(gradeGrupo)) {
      fantasma.velocityY = 0
    }

    if (fantasma.isTouching(blocoInvisivelGp) || fantasma.y > 600) {
      fantasma.destroy();
      
      gameState = "end";
    }


    drawSprites();
  }

  if (gameState === "end"){
  fill("red");
  stroke("white");
  textSize(30);
  text("You lose",250,300);  

  }


}


function createAll() {

  if (frameCount % 240 === 0) {
    porta = createSprite(200, -50);
    grade = createSprite(200, 10);
    blocoInvisivel = createSprite(200, 10);

    blocoInvisivel.width = grade.width;
    blocoInvisivel.height = 2;

    porta.x = Math.round(random(120, 400));
    grade.x = porta.x
    blocoInvisivel.x = porta.x;

    porta.velocityY = 1;
    grade.velocityY = 1;
    blocoInvisivel.velocityY = 1;

    porta.addImage(imagemPorta);
    grade.addImage(imagemGrade);

    porta.lifetime = 800;
    grade.lifetime = 800;
    blocoInvisivel.lifetime = 800;

    porta.depth = fantasma.depth - 1;

    portaGrupo.add(porta);
    gradeGrupo.add(grade);
    blocoInvisivelGp.add(blocoInvisivel);

    blocoInvisivel.debug = true;










  }

}
