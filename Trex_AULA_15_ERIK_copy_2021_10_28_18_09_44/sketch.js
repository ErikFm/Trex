//Criado as variáveis:
var solo, imagemsolo;
var trex, trex_correndo, trex2;
var beiradas; 
var soloinvisivel;
var nuvem,nuvempng;
var cactos,c1,c2,c3,c4,c5,c6;
var ptc=0;
var grupoCactos, grupoNuvens;
var estadodojogo = "JOGAR"
var fj, fjpng;
var bto, btopng;
var die,jump,cp;
var vlc=4;

//Função de carregamento das imagens e animações:
function preload(){
  trex_correndo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  trex2 = loadImage ("trex_collided.png");
  fjpng = loadImage ("gameOver.png");
  imagemsolo = loadImage ("ground2.png");
  nuvempng = loadImage ("cloud.png");
  c1 = loadImage ("obstacle1.png");
  c2 = loadImage ("obstacle2.png");
  c3 = loadImage ("obstacle3.png");
  c4 = loadImage ("obstacle4.png");
  c5 = loadImage ("obstacle5.png");
  c6 = loadImage ("obstacle6.png");
  btopng = loadImage ("restart.png");
  die = loadSound ("die.mp3");
  jump = loadSound ("jump.mp3");
  cp = loadSound ("checkPoint.mp3");
}

//Padrões de configuração do jogo!
function setup(){ 
  createCanvas(600,200)
  
  //criar um sprite do trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("t2",trex2);
  
  trex.scale = 0.5;
  
  beiradas = createEdgeSprites ();
  solo = createSprite(300,190,600,20);
  fj = createSprite(300,100,10,10);
  bto = createSprite(300,130,30,30);
  bto.addImage(btopng);
  bto.scale=0.5
  fj.scale=0.7
  fj.addImage(fjpng);
  solo.addImage("chao",imagemsolo);
  fj.visible = false;
  bto.visible = false;
  
  //trex.debug=true;
  //trex.setCollider("circle",60,0,40);
  
  soloinvisivel = createSprite(300,200,600,10);
  soloinvisivel.visible = false;
  
  grupoCactos = new Group();
  grupoNuvens = new Group();
}


function draw(){
  background ("white");
   drawSprites();
  text("pontuação: "+ptc,500,20);
  
  if (estadodojogo === "JOGAR"){
    
      ptc=ptc+Math.round(frameCount/200);
    if (ptc%100 === 0 && ptc > 0){
      vlc=vlc+1;
      cp.play();
    }
      solo.velocityX = -vlc;
      if (solo.x < 0){
    solo.x = solo.width / 2
  }
    if(keyDown("space") && trex.y > 170){
    trex.velocityY =  -10;
      jump.play();
  }
  trex.velocityY =  trex.velocityY + 0.5; //gravidade
      
  criarnuvens();
  criarcaquitos();
    
    if (trex.isTouching(grupoCactos)){
      //trex.velocityY =  -10;
      //jump.play();
      die.play();
      estadodojogo = "ENCERRAR";
    }
    
  }else if(estadodojogo === "ENCERRAR"){
      solo.velocityX = 0;
    trex.velocityY = 0;
    grupoCactos.setVelocityXEach(0);
     grupoNuvens.setVelocityXEach(0);
    grupoCactos.setLifetimeEach(-1);
    grupoNuvens.setLifetimeEach(-1);
    trex.changeAnimation("t2",trex2);
    fj.visible = true;
    bto.visible = true;
    if(mousePressedOver(bto)){
      botao();
    }
    
  }
 trex.collide(soloinvisivel);
  
  


}

function criarnuvens(){
  if (frameCount%60 === 0){
  nuvem = createSprite(700,100,10,10);
  nuvem.velocityX=-3  
    nuvem.addImage(nuvempng);
    nuvem.y=Math.round(random(10,60));
    nuvem.depth=trex.depth;
    trex.depth=trex.depth+1;
    nuvem.lifetime=250;
    grupoNuvens.add(nuvem);
  }
}
function criarcaquitos(){
  if (frameCount%80 === 0){
      cactos = createSprite(610,174,10,10);
    cactos.velocityX=-vlc;
    cactos.debug=true;
    var cactosaleatorios=Math.round(random(1,6));
    switch(cactosaleatorios){
      case 1:cactos.addImage(c1);
      break;
      case 2:cactos.addImage(c2);
      break;
      case 3:cactos.addImage(c3);
      break;
      case 4:cactos.addImage(c4);
      break;
      case 5:cactos.addImage(c5);
      break;
      case 6:cactos.addImage(c6);
      break;
      default:break;
    }
    cactos.scale=0.5;
    cactos.lifetime=250;
    grupoCactos.add(cactos);
    }
}
function botao(){
 ptc = 0;
  estadodojogo = "JOGAR";
grupoCactos.destroyEach();
      fj.visible = false;
    bto.visible = false;
  grupoNuvens.destroyEach();
trex.changeAnimation("running",trex_correndo);
}