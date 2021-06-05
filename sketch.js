var TTank1Img, TTank2Img, TTank3Img, BTank1Img, BTank2Img, BTank3Img, flappyImg;
var flappyBird, ground, groundImage, obstaclesGroup, obstacles2Group, obstacle, obstacle2;
var PLAY = 1;
var END = 0;
var score = 0;
var gameState = PLAY;
var gameOver, gameOverImg, restart, restartImg;

function preload() {
  TTank1Img = loadImage("images/toptank1.jpg");
  TTank2Img = loadImage("images/toptank2.jpg");
  TTank3Img = loadImage("images/toptank3.jpg");
  BTank1Img = loadImage("images/bottomtank1.jpg");
  BTank2Img = loadImage("images/bottomtank2.jpg");
  BTank3Img = loadImage("images/bottomtank3.jpg");
  flappyImg = loadImage("images/flappy_bird.png");
  groundImage = loadImage("images/ground.png");
  gameOverImg= loadImage("images/gameover.png");
  restartImg=loadImage("images/restart-removebg-preview.png");
}

function setup() {
  createCanvas(1300, 850);


  ground = createSprite(610, 780, 2000, 20);
  //ground.addImage(groundImage);
  //ground.scale=1.4;
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible=false;
  console.log(flappyBird);
  flappyBird = createSprite(48, 780, 50, 50);
  flappyBird.addImage(flappyImg);
  flappyBird.scale = 0.18;

  obstaclesGroup = new Group();
  obstacles2Group = new Group();
  
  gameOver= createSprite(650,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

  restart=createSprite(650,420);
  restart.addImage(restartImg);
  restart.scale=0.6;
  restart.visible=false;

}

function draw() {
  background(groundImage);

  textSize(25);
  text("Score: " + score, 1170, 50);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);

    if (keyDown("space")) {
      flappyBird.velocityY = -15;
    }
    flappyBird.velocityY = flappyBird.velocityY + 1;

    if (ground.x < 300) {
      ground.x = ground.width / 2;
    }

    spawnObstacles1();
    spawnObstacles2();

    
    if (obstaclesGroup.isTouching(flappyBird) || obstacles2Group.isTouching(flappyBird)) {
      gameState = END;
      flappyBird.velocityY = 0;
    }

  }
  else if (gameState === END) {
    gameOver.visible=true;
    restart.visible=true;

    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstacles2Group.setVelocityXEach(0);

    obstaclesGroup.setLifetimeEach(-1);
    obstacles2Group.setLifetimeEach(-1);
  }

  if(mousePressedOver(restart)){
    reset();
  }

  flappyBird.collide(ground);
  drawSprites();
  // textSize(30);
  // fill("white");
  // text(mouseX + "," + mouseY, 30, 30);
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;

  score=0;

  obstaclesGroup.destroyEach();
  obstacles2Group.destroyEach();
}

function spawnObstacles1() {
  if (frameCount % 60 === 0) {
     obstacle = createSprite(1120, 600, 10, 40);
    //obstacle.debug = true;
    obstacle.velocityX = -7;

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle.addImage(BTank1Img);
        break;
      case 2: obstacle.addImage(BTank2Img);
        break;
      case 3: obstacle.addImage(BTank3Img);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 4.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

    restart.depth = obstacle.depth;
    restart.depth = restart.depth + 1;
  }
}

function spawnObstacles2() {
  if (frameCount % 60 === 0) {
     obstacle2 = createSprite(1120, 80, 10, 40);
    //obstacle.debug = true;
    obstacle2.velocityX = -7;

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: obstacle2.addImage(TTank1Img);
        break;
      case 2: obstacle2.addImage(TTank2Img);
        break;
      case 3: obstacle2.addImage(TTank3Img);
        break;
      default: break;
    }

    //assign scale and lifetime to the obstacle           
    obstacle2.scale = 4.5;
    obstacle2.lifetime = 300;
    //add each obstacle to the group
    obstacles2Group.add(obstacle2);
  }
}