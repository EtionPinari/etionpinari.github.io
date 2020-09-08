import {changeBodyTag, Ground} from './ground.js';
import {Player} from './player.js';
import { Input } from './input.js';
import {CollisionDetector} from './collisionDetector.js'
import {PlatformGenerator} from './platformGenerator.js'
import {EnemyBall} from './enemyBall.js';
import {CoinSpawner} from './coinSpawner.js';

const GAME_CONSTANT  = {
    PAUSE : 0,
    RUNNING : 1,
    MENU : 2,
    GAMEOVER : 3
};

let frameCounter = 1;
const frameMultiplier = 10;
const frame1 = document.getElementById('frame1');
const frame2 = document.getElementById('frame2');
const frame3 = document.getElementById('frame3');
const coin = document.getElementById('coin');
const noMushroom = document.getElementById('noMushroom');
const mushroom = document.getElementById('mushroom');
const bigCloud = document.getElementById('bigCloud-1');
const smallCloudA = document.getElementById('smallCloud-1');
const smallCloudB = document.getElementById('smallCloud-2');
const smallCloudC = document.getElementById('smallCloud-3');
// console.log(frame1);
const numberOfPlatforms = 35;
const numberOfCoins = 30;
const scoreIncreaser = 100;

const contDiv = document.querySelector(".content-white");
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const canvasAttributes = document.querySelector('canvas');
canvasAttributes.width = GAME_WIDTH;
canvasAttributes.height = GAME_HEIGHT;
const gameScreen = document.querySelector(".screenContainer");
gameScreen.addEventListener('click', (e) => changeBodyTag(contDiv));
let restart = false;    
playGame()
function drawClouds(context){
    for(let i = 0 ; i<=GAME_WIDTH/150;i++)
        context.drawImage(bigCloud,i*150,0);
    
    context.drawImage(smallCloudA,250,0);
    context.drawImage(smallCloudB,290,0);
    context.drawImage(smallCloudC,430,0);
    context.drawImage(smallCloudA,50,0);
    context.drawImage(smallCloudB,900,0);
    context.drawImage(smallCloudC,1100,0);
}
function playGame(){

let gameState = GAME_CONSTANT.RUNNING;
let canvas = document.getElementById("game-1");
let context = canvas.getContext('2d');
context.fillStyle = "#87CEEB"
context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
//generate world
let ground = new Ground(GAME_WIDTH,GAME_HEIGHT);
let platformGenerator = new PlatformGenerator(GAME_WIDTH,GAME_HEIGHT, ground, noMushroom, mushroom);
platformGenerator.buildPlatform(numberOfPlatforms);
//generate player and its controls
let player = new Player(GAME_WIDTH,GAME_HEIGHT);
let inputController = new Input(player, gameState);
let coinsSpawner = [];
for(let i = 0; i < numberOfCoins; i++){
    coinsSpawner.push(
        new CoinSpawner(GAME_WIDTH,GAME_HEIGHT,coin)
    );
    coinsSpawner[i].putOnPlatform(platformGenerator.getRandomPlatform());
} 
let lastTime = 0;

let collisionDetector = new CollisionDetector();

let enemyBall = new EnemyBall(GAME_WIDTH, GAME_HEIGHT);

let gameBackgroundColor = "#87CEEB"; 
let lost = false;
let score = 0;
gameLoop();

function gameLoop(timeStamp){
    // calculate current time and differential time
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //remove last drawing
    context.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);
    context.fillStyle = gameBackgroundColor;
    context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    // check collisions
    if(collisionDetector.checkCollision(enemyBall,ground)){
        enemyBall.collidedWith(ground);
    }

    gameState = inputController.gameState;
    

    let allPlatforms = platformGenerator.getAllPlatformsArray();
    let double = enemyBall.getDouble()
    if(!lost){

        if(double != null){
            if(collisionDetector.checkCollision(double, player)){
                player.killed();
                lost = true;
            }
        }
        
        if(collisionDetector.checkCollision(player,ground))
            player.collidedWith(ground);
    
        if(collisionDetector.checkCollision(enemyBall, player)){
            player.killed();
            lost = true;
        }
        for(let i = 0; i<allPlatforms.length; i++){
            if(collisionDetector.checkCollision(player,allPlatforms[i])){
                player.collidedWith(allPlatforms[i]);
                break;
            }
        }
        for(let i = 0; i<coinsSpawner.length; i++){
                if(collisionDetector.checkCollision(coinsSpawner[i],player)){
                    coinsSpawner[i].kill();
                    score += 100;
                    console.log(score);
                }
        }
    }
    

    for(let i = 0; i<allPlatforms.length; i++){
        if(collisionDetector.checkCollision(enemyBall,allPlatforms[i])){
            enemyBall.collidedWith(allPlatforms[i]);
            break;
        }
    }    
    if(double != null){
        for(let i = 0; i<allPlatforms.length; i++){
            if(collisionDetector.checkCollision(double,allPlatforms[i])){
                double.collidedWith(allPlatforms[i]);
                break;
            }

        }
    }

    drawClouds(context);


    if(!lost){
        // update positions
        if(gameState != GAME_CONSTANT.PAUSE)
        player.update(deltaTime);
        player.draw(context);
    }
    for(let i =0 ; i<coinsSpawner.length; i++){
        
        if(gameState != GAME_CONSTANT.PAUSE)
        coinsSpawner[i].update(deltaTime);
        coinsSpawner[i].draw(context);
    }

    if(gameState != GAME_CONSTANT.PAUSE)
    enemyBall.update(deltaTime);
    // update drawings
    context.fillStyle = "black";
    ground.draw(context);
    // coinSpawner.draw(context);
    platformGenerator.draw(context);
    enemyBall.draw(context);
    
    context.font = "20px Arial sans-serif";
    context.fillStyle = "#FFDF00";
    context.fillText(`Score : ${score}`,GAME_WIDTH-180,20);
    context.fillText('Press P to pause', GAME_WIDTH-180, 40);
    
    

    if(score == numberOfCoins*scoreIncreaser){
        showWinScreen(context);
    } else if(lost){
        // frame1.style.display = "inline";
        showLosingScreen(context)
    }

    if(score >= numberOfCoins*scoreIncreaser/2){
        enemyBall.enrage();
    }
    if(score >= numberOfCoins*scoreIncreaser*0.60){
        enemyBall.duplicate();
    }
    if(!restart)
        requestAnimationFrame(gameLoop);


    if(gameState == GAME_CONSTANT.PAUSE){
        context.fillStyle = "rgba(0,20,20,0.3)"
        context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    
        context.font = "60px Arial";
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.textAlign = "center";
        context.fillText("Paused" , GAME_WIDTH/2, GAME_HEIGHT/2);

    }
        //end func
}


function showWinScreen(context){
    context.font = "60px Arial";
    context.fillStyle = "black";
    context.fillText(`YOU WON!`,GAME_WIDTH/2-120,GAME_HEIGHT/4-52);
}
function showLosingScreen(context){
    if(gameBackgroundColor != "blue")
        gameBackgroundColor = "blue";
        

    if(frameCounter >= 1 && frameCounter <= frameMultiplier){
        context.drawImage(frame1, GAME_WIDTH/2-200, GAME_HEIGHT/4-52, 348, 52);
    } else if (frameCounter >= 1 + frameMultiplier && frameCounter <= 2*frameMultiplier){
        context.drawImage(frame2, GAME_WIDTH/2-200, GAME_HEIGHT/4-52, 348, 52);
    } else {
        context.drawImage(frame3, GAME_WIDTH/2-200, GAME_HEIGHT/4-52, 348, 52);
        if(frameCounter == 3*frameMultiplier)
            frameCounter = 0;
    }
    context.lineWidth = 3;
    context.strokeRect(GAME_WIDTH/2-200, GAME_HEIGHT/4-52, 348, 52);
    frameCounter++;

}




}