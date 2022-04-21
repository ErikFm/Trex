//Criado as variáveis:
var solo, imagemsolo;
var trex, trex_correndo;
var beiradas; 
var soloinvisivel;
var nuvem,nuvempng;
var cactos,c1,c2,c3,c4,c5,c6;
var ptc=0;

//Função de carregamento das imagens e animações:
function preload(){
  trex_correndo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  imagemsolo = loadImage ("ground2.png");
  nuvempng = loadImage ("cloud.png");
  c1 = loadImage ("obstacle1.png");
  c2 = loadImage ("obstacle2.png");
  c3 = loadImage ("obstacle3.png");
  c4 = loadImage ("obstacle4.png");
  c5 = loadImage ("obstacle5.png");
  c6 = loadImage ("obstacle6.png");
}

//Padrões de configuração do jogo!
function setup(){ 
  createCanvas(600,200)
  
  //criar um sprite do trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.scale = 0.5;
  
  beiradas = createEdgeSprites ();
  solo = createSprite(300,190,600,20);
  solo.addImage("chao",imagemsolo);
  
  soloinvisivel = createSprite(300,200,600,10);
  soloinvisivel.visible = false;
}


function draw(){
 //console.log (trex.y);
  background ("white");
  drawSprites();
  text("pontuação: "+ptc,500,20);
  ptc=ptc+Math.round(frameCount/100);
  //console.log(trex.y);
  if(keyDown("space") && trex.y > 170){
    trex.velocityY =  -10;
  }
  trex.velocityY =  trex.velocityY + 0.5; //gravidade
  solo.velocityX = -3;
  if (solo.x < 0){
    solo.x = solo.width / 2
  }
  trex.collide(soloinvisivel);
  criarnuvens();
  criarcaquitos();
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
  }
}
function criarcaquitos(){
  if (frameCount%80 === 0){
      cactos = createSprite(610,174,10,10);
    cactos.velocityX=-3;
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
    }
}