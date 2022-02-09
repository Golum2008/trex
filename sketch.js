//variáveis
var trex, trex_running,trex_collided;
var edges;
var ground, groundImage;
var invisibleground;
var nuvem,nuvemImage;
var cacto1,cacto2,cacto3,cacto4,cacto5,cacto6;
var score = 0;
var PLAY = 1;
var END = 0;
var gamesstate = PLAY;
var gameouver,gameouverimage;
var reset,resetimage;
var jumpsound;
var deadsound;
var checksound;
//pré carregamento de imagens para criar uma animação em sprites 
function preload() {
  //trex
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundImage = loadImage ("ground2.png");
nuvemImage = loadImage ("cloud.png");
cacto1 = loadImage ("obstacle1.png");
cacto2 = loadImage ("obstacle2.png");
cacto3 = loadImage ("obstacle3.png");
cacto4 = loadImage ("obstacle4.png");
cacto5 = loadImage ("obstacle5.png");
cacto6 = loadImage ("obstacle6.png");
trex_collided=loadAnimation("trex_collided.png");
gameouverimage=loadImage("gameOver.png");
resetimage=loadImage("restart.png");
jumpsound = loadSound("jump.mp3");
deadsound = loadSound("die.mp3");
checksound = loadSound("checkPoint.mp3");
}

//configuração
function setup() {
  //área do jogo
  createCanvas(600, 200);

  //trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;

  edges = createEdgeSprites();
ground = createSprite (200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2;

invisibleground = createSprite(200,190,400,10);
invisibleground.visible = false;
cactosgroup=new Group ();
Nuvensgroup=new Group(); 
gameouver=createSprite(300,100);
gameouver.addImage(gameouverimage);
gameouver.visible=false;
gameouver.scale=0.5;
reset=createSprite(300,140);
reset.addImage(resetimage);
reset.visible=false;
reset.scale=0.5;
trex.setCollider("rectangle",10,10,400,trex.height);
//trex.debug=true;

//var teste =Math.round (random(1,100));
//console.log(teste); 
}

function draw() {
  background('white');
  text("score: "+ score,500,50);
  console.log("isto é",gamesstate);
  if (gamesstate===PLAY){
    ground.velocityX = -(4+3*score/100);  
    score = score + Math.round(frameCount/60);
    if(score > 0 && score % 100===0){
      checksound.play();  
    }
    if (ground.x<0) {
      ground.x = ground.width/2;
    }
    if (keyDown("space")&& trex.y>=160) {
      trex.velocityY = -10;
      jumpsound.play();
    }
     //GRAVIDADE
  trex.velocityY = trex.velocityY + 0.5
  criarcacto();
  criarnuvens();
  if (cactosgroup.isTouching(trex)){
    trex.velocityX = -10;
    jumpsound.play();
   // gamesstate=END;
   // deadsound.play();
  }
  }
else if (gamesstate===END){
  ground.velocityX = 0;
  trex.velocityY =0;
  trex.changeAnimation("collided",trex_collided);
  cactosgroup.setLifetimeEach(-1);
  Nuvensgroup.setLifetimeEach(-1);
  cactosgroup.setVelocityXEach(0);
  Nuvensgroup.setVelocityXEach(0);
  gameouver.visible=true;
  reset.visible=true;
}
  
//trex.collide(ground);
  trex.collide(invisibleground);

 // console.log(frameCount);
  drawSprites();
}



function criarnuvens(){
  if (frameCount%60==0){
  nuvem = createSprite (610,100,10,10);
nuvem.y = Math.round(random(50,100));
nuvem.velocityX = -3;
nuvem.addImage("nuvem",nuvemImage); 
nuvem.scale = 0.5;
nuvem.depth = trex.depth;
trex.depth = trex.depth +1;
console.log (nuvem.depth);
console.log (trex.depth);
nuvem.lifetime = 220;
Nuvensgroup.add(nuvem);
}
}

function criarcacto(){
  if (frameCount%60==0){
 var cacto = createSprite (610,165,10,40);
  cacto.velocityX = -(6+score/100);


  var aleatorio = Math.round (random(1,6));
  switch (aleatorio){
    case 1: cacto.addImage(cacto1);
    break;
    case 2: cacto.addImage(cacto2);
    break;
    case 3: cacto.addImage(cacto3);
    break;
    case 4: cacto.addImage(cacto4);
    break;
    case 5: cacto.addImage(cacto5);
    break;
    case 6: cacto.addImage(cacto6);
    break;
    default: break;
  }
  cacto.scale = 0.5;
  cacto.lifetime = 220;
  cactosgroup.add(cacto);
}
}