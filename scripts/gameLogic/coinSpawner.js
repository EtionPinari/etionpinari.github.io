// const { EnemyBall } = require("./enemyBall.js");

const maxFrames = 15 * 6;
const ySpeed = -2;
class CoinSpawner extends EnemyBall{

    constructor(GAME_WIDTH, GAME_HEIGHT, image){
        super(GAME_WIDTH, GAME_HEIGHT); 
        this.radius = (GAME_WIDTH+GAME_HEIGHT)/2/35;
        this.position = {
            x : -100,
            y : -100
        };
        this.speed = {
            x : 0,
            y : ySpeed
        };
        this.image = image;
        this.visible = true;
        this.imageCounter = 1;
    }
    draw(context){
        if(this.visible)
            context.drawImage(this.image, this.position.x, this.position.y, this.radius,this.radius);
    }
    update(deltaTime){
        if(this.visible){
            super.update(deltaTime);
            this.imageCounter++;
            if(this.imageCounter == maxFrames){
                this.imageCounter = 1;
                this.speed.y = -this.speed.y;
            }
        }
        
        
    }

    putOnPlatform(platform){
        let xOff = (platform.width - this.radius) * Math.random();
        this.position.x = platform.position.x + xOff;
        this.position.y = platform.position.y - this.radius;
        this.speed.y = ySpeed - 1 + 2*Math.random();
    }
    kill(){
        this.visible = false;
        this.radius = 0;
        this.position = {x: -1, y : this.GAME_HEIGHT};
    }
}
import {EnemyBall} from './enemyBall.js';
export {CoinSpawner};