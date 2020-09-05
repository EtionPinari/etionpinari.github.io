import {makeRed, removeRed, changeBodyTag, Ground} from './ground.js';
import {Player} from './player.js';
import { Input } from './input.js';
import {CollisionDetector} from './collisionDetector.js'
import {PlatformGenerator} from './platformGenerator.js'














const contDiv = document.querySelector(".content-white");
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const canvasAttributes = document.querySelector('canvas');
canvasAttributes.width = GAME_WIDTH;
canvasAttributes.height = GAME_HEIGHT;
const gameScreen = document.querySelector(".screenContainer");
gameScreen.addEventListener('click', (e) => changeBodyTag(contDiv));

let canvas = document.getElementById("game-1");
let context = canvas.getContext('2d');
context.fillStyle = "#87CEEB"
context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
//generate world
let ground = new Ground(GAME_WIDTH,GAME_HEIGHT);
let platformGenerator = new PlatformGenerator(GAME_WIDTH,GAME_HEIGHT, ground);
platformGenerator.buildPlatform(30);
//generate player and its controls
let player = new Player(GAME_WIDTH,GAME_HEIGHT);
let inputController = new Input(player);
let lastTime = 0;

let collisionDetector = new CollisionDetector();





gameLoop();

function gameLoop(timeStamp){
    // calculate current time and differential time
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    //remove last drawing
    context.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);
    context.fillStyle = "#87CEEB"
    context.fillRect(0,0,GAME_WIDTH,GAME_HEIGHT);
    // check collisions
    if(collisionDetector.checkCollision(player,ground))
        player.collidedWith(ground);
    let allPlatforms = platformGenerator.getAllPlatformsArray();
    for(let i = 0; i<allPlatforms.length; i++){
        if(collisionDetector.checkCollision(player,allPlatforms[i])){
            player.collidedWith(allPlatforms[i]);
        }
    }
    // update positions
    player.update(deltaTime);

    // update drawings
    context.fillStyle = "black";
    ground.draw(context);
    platformGenerator.draw(context);
    player.draw(context);

    requestAnimationFrame(gameLoop);
}









// let canvas = document.getElementById("game-1");
// let context = canvas.getContext('2d');
// canvas.style.backgroundColor = "black";
// context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

// context.fillStyle = '#af0a0a';
// // context.fillRect(20, 0, 20, 20);

// let ground = new Ground(GAME_WIDTH, GAME_HEIGHT);
// ground.draw(context);

// let firstPlayer = new Player(GAME_WIDTH,GAME_HEIGHT);
// firstPlayer.draw(context);

// let lastTime = 0
// let inputListener = new Input(firstPlayer);

// let collisionDetector = new CollisionDetector();

// let platformGenerator = new PlatformGenerator(GAME_WIDTH, GAME_HEIGHT, ground);
// platformGenerator.buildPlatform(30);
// gameLoop();
// // console.log(platformGenerator);

// function gameLoop(timeStamp){
//     let deltaTime = timeStamp - lastTime;
//     context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
//     context.fillStyle = "brown";
//     ground.draw(context);
    
//     platformGenerator.draw(context);
//     lastTime = timeStamp;
//     if(collisionDetector.checkCollision(firstPlayer, ground))
//         firstPlayer.bumpedGround(ground.position.y);
//     else firstPlayer.setGrounded(false);
//     let allPlatforms = platformGenerator.getAllPlatformsArray();

//     for(let index = 0; index< allPlatforms.length; index++){
//         if(collisionDetector.checkCollision(firstPlayer,allPlatforms[index])){
            
//                 firstPlayer.bumpedGround(allPlatforms[index].position.y);
//                 console.log(
//                 `PLAYER BUMPED AND HIS POSITION IS  ${firstPlayer.position.x} ${firstPlayer.position.y}`
//                 );
//             }
//         }
//     // alert("First player and ground got bumped upon");
//     //to define player

//     firstPlayer.update(deltaTime);
//     firstPlayer.draw(context);
    
//     // console.log(deltaTime);
//     requestAnimationFrame(gameLoop);
    
// }







// //changes color
// context.fillStyle = '#affa0a';
// //created a C shape
// //context.fillRect(70, 70, 20, 10);
// context.fillRect(40,70,50,10); // __
// context.fillRect(40,80,10,40); //|
// context.fillRect(40,110,50,10);// __

// // created a U shape
// context.fillRect(150,80,10,40); //  |
// context.fillRect(100,80,10,40);//|
// context.fillRect(100,110,50,10);// _ 

// //created a T shape

// context.fillRect(185,80,10,40);//|
// context.fillRect(170,80,40,10);// _ 











//Trash ;
// console.log(document);
// console.log(document);
// alert("wait");


// document.body.style.backgroundImage = "";
// let screenSettings = new ScreenSettings(); 
// console.log(body);
// gameScreen.addEventListener('mouseover' , (e) => alert("You have hovered your mouse on top of this class"));
// gameScreen.addEventListener('mouseout' , (e) => alert("You have removed your mouse from this class"));

// gameScreen.addEventListener('mouseout', (e) => resetEffects());


