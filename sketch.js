var PLAY=0;
var END=1;

var gameState=PLAY;

var pipGroup;
var bg,score=-2; // value of score is -2 since we want to increase the score when bird passes through pipe and not when pipes are created.
var bird, birdImg, hit;
var pipeUp, pipeDown, gameOver,base;
var p1,p2,p3, p4,p5,p6, gameOverImg,baseImg, dieSound;
var pipeGroup, restart, restartImg,scGroup;

function preload(){
    bg= loadImage("sprites/background-day.png");
    birdImg=loadAnimation("sprites/redbird-downflap.png","sprites/redbird-midflap.png","sprites/redbird-upflap.png")
    baseImg=loadImage("sprites/base.png")
    p1=loadImage("sprites/pipe-green.png")
    p2=loadImage("sprites/pipe-green1.png")
    p3=loadImage("sprites/pipe-green2.png")
    p4=loadImage("sprites/pipe-greenUp.png")
    p5=loadImage("sprites/pipe-green1Up.png")
    p6=loadImage("sprites/pipe-green2Up.png")
    gameOverImg=loadImage("sprites/gameover.png")
    restartImg=loadImage("sprites/restart.png");
    dieSound=loadSound("audio/die.wav")
    hit=loadSound("audio/hit.wav")
    s0=loadImage("sprites/0.png")
    s1=loadImage("sprites/1.png")
    s2=loadImage("sprites/2.png")
    s3=loadImage("sprites/3.png")
    s4=loadImage("sprites/4.png")
    s5=loadImage("sprites/5.png")
    s6=loadImage("sprites/6.png")
    s7=loadImage("sprites/7.png")
    s8=loadImage("sprites/8.png")
    s9=loadImage("sprites/9.png")
}

function setup(){
    createCanvas(800,800);
    bird=createSprite(400,400,100,100);
    bird.addAnimation("flappy bird",birdImg)
    bird.scale=1.5

    base =createSprite(300,850)
    base.addImage(baseImg)

    base.x=base.width/2;
    base.velocityX=-2

    pipeGroup = new Group();

    gameOver=createSprite(400,400);
    gameOver.addImage(gameOverImg);
    gameOver.visible=false
    restart=createSprite(400,500);
    restart.addImage(restartImg)
    restart.visible=false

   scGroup= new Group()
    
}

function draw(){
    background(bg);

    if(gameState===PLAY){
        spawnPipes();

        if(base.x<0){
            base.x=base.width/2;
        }
        bird.velocityY=2
        if(keyDown("space")){
            bird.velocityY=-10
        }
        if(bird.isTouching(pipeGroup) || bird.y>600){
            gameState=END;
            dieSound.play()
            hit.play()
        }
    }
    if(gameState===END){

        bird.velocityY=0;
        base.velocityX=0;
        pipeGroup.setVelocityXEach(0);
        gameOver.visible=true;
        restart.visible=true;
        pipeGroup.depth=restart.depth
        restart.depth=restart.depth+1
        gameOver.depth=pipeGroup.depth+1

    }


    drawSprites();
}

function mousePressed(){
    reset();
}

function reset(){
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    bird.y=400
    base.velocityX=-2
    pipeGroup.destroyEach()
    scGroup.destroyEach()
    score=-2
    
}

function spawnPipes(){
    if(frameCount%120==0){

    pipeUp=createSprite(850,150)
    pipeUp.velocityX=-2
    pipeUp.scale=1.5

    pipeDown=createSprite(850,650)
    pipeDown.velocityX=-2
    pipeDown.scale=1.5

    base.depth=pipeDown.depth;
    base.depth=base.depth+1;

    var rand= Math.round(random(1,3));

    switch(rand){
        case 1:pipeUp.addImage(p6)
        pipeDown.addImage(p1);
        break;

        case 2:pipeUp.addImage(p4);
        pipeDown.addImage(p3);
        break;

        case 3:pipeUp.addImage(p5);
        pipeDown.addImage(p2);
        break;
    }

    pipeGroup.add(pipeUp)
    pipeGroup.add(pipeDown)

    score=score+1                   
    sc=createSprite(400,100,1,1)

    switch(score){
        case 0:sc.addImage(s0)
        break;
        case 1:sc.addImage(s1)
        break;
        case 2:sc.addImage(s2)
        break;
        case 3:sc.addImage(s3)
        break;
        case 4:sc.addImage(s4)
        break;
        case 5:sc.addImage(s5)
        break;
        case 6:sc.addImage(s6)
        break;
        case 7:sc.addImage(s7)
        break;
        case 8:sc.addImage(s8)
        break;
        case 9:sc.addImage(s9)
        break;
    }
    scGroup.add(sc)

    }
}