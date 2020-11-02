  

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var wall,wall2;
var player;
var ncPlayer;
var Ground;
//background

var bg;
var bg1;
var bg2;
var bg3;
var bg4, pimage, ncPimage;

var player, ncPlayer,ground;

var bulletGroup, enemyBulletGroup;

//score
var count = 200;
var ncCount =  200;

var a = 1;

var playerInfo, enemyInfo, restart;

var life1, life2,life3



function preload(){
    bg = loadImage("battlegrond2.png");
    bg1 = loadImage("battlegrond3.png");
    bg2 = loadImage("battleground6.png");
    pimage = loadImage("robot.jpg");
    ncPimage = loadImage("robot.jpg");
}

function setup (){

    createCanvas(displayWidth-30,displayHeight-20);

    player = createSprite(60,650,70,70);
    player.debug = true;
     ncPlayer = createSprite(displayWidth-100,displayHeight - 200,70,70);
     ncPlayer.debug = true;
     ground = createSprite(displayWidth/2,displayHeight - 190,displayWidth,20);
     ground.debug = true;

     

     //info bars
     playerInfo =  createSprite(displayWidth/2 - 385,displayHeight-20,displayWidth/2,320);
     playerInfo.debug =true;
     enemyInfo =  createSprite(displayWidth - 385,displayHeight-20,displayWidth/2,320);
     enemyInfo.debug = true;
     

     // walls

     //wall
     wall = createSprite(displayWidth,650,20,displayHeight*2);
     wall.debug =true;

     //wall2
     wall2 = createSprite(displayWidth /2 - 770,650,20,displayHeight*2);
     wall2.debug =true;


      bulletGroup = new Group();
      enemyBulletGroup = new Group();

      player.addImage("player",pimage);
      ncPlayer.addImage("ncPlayer",ncPimage);

      player.scale = 0.2;
    ncPlayer.scale = 0.2;


}


function draw(){

    background(0); 


  

    //info
    playerInfo.x = displayWidth/2 - 385;
    enemyInfo.x = displayWidth- 385;

    if(gameState === PLAY){


      

 
  
      if(keyDown("space")&& player.y >= 650){
        player.velocityY = -12 ;
        player.velocityY = player.velocityY +0.8;
      }



      
       // enemy

      text(" Enemy's health:"+ ncCount, ncPlayer.x - 500  , ncPlayer.y - 50);
       

       //player
      
        text("health:"+ count, player.x -20, player.y - 50);
        
         //jump when the space key is pressed
      
        

      

        if(player.isTouching(enemyBulletGroup)){
    
          enemyBulletGroup.destroyEach();
        }

        if(ncPlayer.isTouching(bulletGroup)){
          bulletGroup.destroyEach();
        }

        

        //moveright and jump
       var r = Math.random(60,100);

        if(frameCount/r){
        jump();
        moveRight();
        ncPlayer.velocityY = ncPlayer.velocityY + 0.8;
        }


        //move right
        var r2 = Math.random(50,120);

        if(frameCount/r2){
        moveRight();
        }

        //jump only
        var r3 = Math.random(52,100);

        if(frameCount/r3){
        jump();
        }

        //move left
        var r4 = Math.random(50,120);

        if(frameCount/r4){
        moveLeft();
        }



        //move left and jump
        var r5 = Math.random(50,120);

        if(frameCount/r5){
        moveLeft();
        jump();
        }
        

        spawnEnemyBullets();

        if(keyDown("b") ){
          spawnBullets();
        }

        
         //moves left

         if(keyWentDown(LEFT_ARROW) ){
            player.velocityX = -3 ;
  
          }

          // moves right
          if(keyWentDown(RIGHT_ARROW) ){
            player.velocityX = 3 ;
  
          }

          if(keyWentUp(LEFT_ARROW)){
            player.velocityX = 0;
          }
          

          if(keyWentUp(RIGHT_ARROW)){
            player.velocityX = 0 ;
          }

      
        //add gravity
        player.velocityY = player.velocityY + 0.8;

        if(bulletGroup.isTouching(ncPlayer) ){
          ncCount = ncCount -5;
        }

        if(enemyBulletGroup.isTouching(player) ){
           count = count -5;
        }

        
         
        }
      // Win
        if(ncCount === 0){
          gameState = END;
          textSize(32);
          text(" You win",displayWidth/2 - 30 , displayHeight/2- 50);
        }

        //lose
        if(count === 0){
          gameState = END;
          textSize(32);
          text("You lose",displayWidth/2 - 30 , displayHeight/2);
        }

      else if(gameState === END) {
        
        textSize(40);
        text("Game Over", displayWidth/2 - 60 , displayHeight/2);

        setTimeout(() => {
          stroke (165, 42, 42, 0.021);
        }, 5000);

        nonmoveRight();
        nonmoveLeft();

        //don't jump when the space key is pressed
        if(keyDown("space") && player.y >= 650){
            player.velocityY = 0 ;
          }

  
           //moves left
           if(keyWentDown(LEFT_ARROW)){
              player.velocityX = 0 ;
    
            }
            if(keyWentUp(LEFT_ARROW)){
              player.velocityX = 0 ;
            }
  
            // moves right
            if(keyWentDown(RIGHT_ARROW) ){
              player.velocityX = 0 ;
    
            }

            if(keyWentUp(RIGHT_ARROW)){
              player.velocityX = 0 ;
            }
          
        
        
          }

          player.collide(ground);


      

      
      if(ncPlayer.collide(wall)){
        moveLeft();
      }
      
      if(ncPlayer.collide(wall2)){
        moveRight();
      }
      



      
//wall

      ncPlayer.collide(wall);
      player.collide(wall);
      //wall2
     

      ncPlayer.collide(wall2);
      player.collide(wall2);
    
    drawSprites();

    }

   function spawnBullets(){
     
       var bullet =  createSprite(60,displayHeight-220,10,5);
       bullet.x = player.x;
       bullet.velocityX = 15;
       if( bullet.x = ncPlayer.x + 1 && ncPlayer.y >= 650){
        jump();
     }
   
  }

   function spawnEnemyBullets(){
    if(frameCount % 60 ===0){
      var enemyBullet =  createSprite(60,displayHeight-20,10,5);
      enemyBullet.velocityX = -15;
      
    }
  }

  function enemyBulletPosition(){
    if(player.x < ncPlayer.x){
      enemyBullet.velocityX =  15;
    }
  }

   //enemy movements
   function jump(){
   if(ncPlayer.y >= 650){
    ncPlayer.velocityY = -12 ;
    ncPlayer = ncPlayer.velocityY+ 0.8;
   }
      
    
   }

    function moveLeft(){
      ncPlayer.velocityX = -3 ;
    }

    function moveRight(){
      ncPlayer.velocityX = 3 ;
    }

    function nonmoveLeft(){
      ncPlayer.velocityX = 0 ;
    }

    function nonmoveRight(){
      ncPlayer.velocityX = 0 ;
    }






