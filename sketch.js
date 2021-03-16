var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
 bgImage = loadImage("images/BG2.jpg");
 pickachu_running = loadAnimation("images/pickachu1.png","images/pickachu2.png","images/pickachu3.png","images/pickachu4.png");
 charizardImage = loadImage("images/charizardimage.png");
 mewtwoImage = loadImage("images/mewtwoimage.png");
 bulbasurImage = loadImage("images/bulbasurimage.png");
 gengarImage = loadImage("images/gengarimage.png");
 blastoiseImage = loadImage("images/blastoiseimage.png");
 gameoverImage = loadImage("images/gameover.jpg");
 restartImage = loadImage("images/restart.jpg");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2);
  bg.addImage(bgImage);
  bg.velocityX = -3;
  pickachu = createSprite(width/4,height/1.3);
  pickachu.addAnimation("running",pickachu_running);
  pickachu.scale = 0.3;
  invisibleGround = createSprite(width/2,height/1.1,width,20);
  
  obstaclesGroup = new Group();
  gameOver = createSprite(width/2,height/2-100);
  gameOver.addImage(gameoverImage);
  gameOver.visible = false;
  gameOver.scale = 0.7;
  restart = createSprite(width/2,height/2+100)
  restart.addImage(restartImage);
  restart.scale = 0.1;
  restart.visible = false;
}

function draw() {
  
  background(180);
  //displaying score
 
  
  
  if(gameState === PLAY){

      if(bg.x<0){
        bg.x = width/2;

      }
      spawnPokemon();
      pickachu.velocityY = pickachu.velocityY+0.5;
      if(keyDown("space")){
      pickachu.velocityY = -12;
      }
      if(obstaclesGroup.isTouching(pickachu)){
        gameState = END;
      }
  }
   else if (gameState === END) {
     bg.velocityX = 0;
     obstaclesGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
     gameOver.visible = true;
     restart.visible = true;
   }
   
  
 
  //stop trex from falling down
  
  
  pickachu.collide(invisibleGround);


  drawSprites();
}

function reset(){
 gameState = PLAY; 
gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
   trex.changeAnimation("running", trex_running);
  score=0;
}


function spawnPokemon(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width,height/1.25);
   //obstacle.velocityX = -(6 + score/100);
  obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(charizardImage);
              break;
      case 2: obstacle.addImage(mewtwoImage);
              break;
      case 3: obstacle.addImage(bulbasurImage);
              break;
      case 4: obstacle.addImage(gengarImage);
              break;
      case 5: obstacle.addImage(blastoiseImage);
              break;
      
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

