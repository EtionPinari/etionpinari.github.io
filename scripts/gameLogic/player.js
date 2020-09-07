
let JUMP_FORCE = 60; //120
let gravityConstant = 0.8;
let frictionCoefficient = 0.3;
let maxFrames = 4;
const N = 1;
const E = 2;
const W = 3;
const S = 4;
class Player{
    constructor(GAME_WIDTH, GAME_HEIGHT){
        this.GAME_HEIGHT = GAME_HEIGHT;
        this.GAME_WIDTH = GAME_WIDTH;
        this.BASE_FORCE = 75; //95
        this.isCrouching = false;
        
        this.visible = true;

        this.width = 10;
        this.height = 30;

        this.selectGravity = true;
        this.grounded = false;

        this.position = {
            x : GAME_WIDTH/5 - this.width,
            y : GAME_HEIGHT*4/5
        }

        this.speed = {
            x : 0,
            y : 0
        }

        this.lastPlatform = null;
        this.lastPosition = {
            x : 0,
            y : 0
        }
        
        this.internalCounter = maxFrames - 1;
    }
    applyGravity(){
        if(this.grounded == false){
            this.speed.y += gravityConstant;
        } else //if(this.speed.y > 0)
            this.speed.y = 0;
             
    }
    moveRight(){
            this.speed.x = this.BASE_FORCE;
    }

    moveLeft(){
            this.speed.x = -this.BASE_FORCE;          
    }

    jump(){
        if(this.grounded){
            this.grounded = false;
            this.speed.y = -JUMP_FORCE;
        }
    }
    
    stop(){
        this.speed.x = 0;
    }

    crouch(){
        if(this.grounded && !this.isCrouching){
            this.position.y = this.position.y + this.height*0.32;//1-0.68
            this.height = this.height*0.68;
            this.BASE_FORCE = this.BASE_FORCE*0.58;
            this.isCrouching = true;
        }
    }

    stopCrouching(){
        if(this.grounded && this.isCrouching)
        {
        this.isCrouching = false;
        this.height = this.height/0.68;
        this.BASE_FORCE = this.BASE_FORCE/0.58;
        this.position.y = this.position.y - this.height*.32;
        }
    }


    update(deltaTime){
        if(!this.visible) return;
        if(!deltaTime) return;
        
        //check if is still colliding
        this.notCollidingAnymore()
        //apply gravity
        this.applyGravity(deltaTime);
        //change positions
        this.updateLastPosition();
        this.position.x += this.speed.x / deltaTime;
        this.position.y += this.speed.y / deltaTime;
        //check if within the boundaries of the game
        this.limitEdges();
    }

    draw(context){
        if(!this.visible) return;
        context.fillStyle = "#FFC0CB";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    //limits the movement to within edge screens
    limitEdges(){
        if(this.position.x <= 0 ){
            this.position.x = 0;
            this.speed.x = 0;
        }
        if(this.position.x >= this.GAME_WIDTH - this.width){
            this.position.x = this.GAME_WIDTH - this.width;
            this.speed.x = 0 ;
        }
        if(this.position.y <= 0){
            this.position.y = 0;
        }
        if(this.position.y >= this.GAME_HEIGHT - this.height)
            this.position.y = this.GAME_HEIGHT-this.height;

    }

    updateLastPosition(){
        this.internalCounter++;
        if(this.internalCounter == maxFrames){
            this.internalCounter = 0;
            this.lastPosition = this.position;
        }
    }

    isMovingRight(){
        // console.log("MOVING RIGHT: SPEED IS" + this.speed.x);
        if(this.speed.x > 0)
                 return true;
        return false;
    }

    isMovingLeft(){
        if(this.speed.x < 0)
                return true;
        return false;
    }

    notCollidingAnymore(){
        if(this.lastPlatform == null) return;
        if(this.position.x + this.width/2 >= this.lastPlatform.position.x + this.lastPlatform.width || this.position.x + this.width/2 <= this.lastPlatform.position.x){
            // alert("NOT!");
            this.lastPlatform = null;
            this.grounded = false;
        }
    }
    
    collidedWith(otherObject){
        if(!this.grounded){
            // this.grounded = true;
            let collidedNEWS = this.collisionNEWS(otherObject);
            switch(collidedNEWS){
                case N:
                    this.position.y = otherObject.position.y - this.height - 0.1  ;
                    this.lastPosition.y = this.position.y ;
                    this.grounded = true;
                    break;
                case E:
                    this.position.x = otherObject.position.x - 0.01; 
                    this.lastPosition.x = this.position.x;
                    break;
                case W:
                    this.position.x = otherObject.position.x + otherObject.width + this.width + 0.01;
                    this.lastPosition.x = this.position.x;
                    break;
                case S:
                    this.position.y = otherObject.position.y + otherObject.height + 1; 
                    this.lastPosition.y = this.position.y;
                    this.speed.y = this.speed.y / 2;
                    break;
                case -1:
                    alert("Error");
            }
            // alert(collidedNEWS);
            this.lastPlatform = otherObject;
        }
    }

    slowJump(){
        if(this.speed.y < -JUMP_FORCE/2){
            this.speed.y = this.speed.y/2;
        }
    }

    collisionNEWS(otherObject){
        // alert(this.lastPosition.x);
        //checks whether he collided in the north east south or west
        if(this.lastPosition.x < otherObject.position.x ){
            // if(this.position.x + this.width >= otherObject.position.x && this.position.x + this.width <= otherObject.position.x + otherObject.width) 
                return E;
        }

        if(this.lastPosition.x + this.width > otherObject.position.x + otherObject.width){
            // if(this.position.x <= otherObject.position.x + otherObject.width && this.position.x >= otherObject.position.x){
                return W;
            // }
        }
        if(this.lastPosition.y <= otherObject.position.y )
        return N;
        // if(this.lastPosition.y >= otherObject.position.y + otherObject.height-1){
            return S;
        // }
        
        // alert( `this last Position : ${this.lastPosition.y} and otherObject floor ${otherObject.position.y + otherObject.height-1}`);
        // return -1;
    }

    killed(){
        // this.width = 2*this.width;
        this.visible = false;
    }
}










// const BASE_VELOCITY = 65;
// const JUMP_FORCE = 75;
// const gravityConstant = 19.8;
// const maxPositionsMaxLength = 160;
// const maxCounter = 3;
// class Player{
//     constructor(GAME_WIDTH, GAME_HEIGHT){
//         this.GAME_HEIGHT = GAME_HEIGHT;
//         this.GAME_WIDTH = GAME_WIDTH;
//         this.select = true;
//         this.height = 40;
//         this.width = 20;
//         //kilos
//         this.weight = 70; 
//         this.position = {
//             x: 20,
//             y: 40
//         };
//         this.speed = {
//             x : 0,
//             y : 0
//         }
//         this.force = {
//             x : 0, //unused
//             y : 0
//         }

//         this.lastPositions = [];
//         this.grounded = false;
        
//         this.internalCounter = 0;
//     }
//     setGrounded(bool) {
//         this.grounded = bool;
//     }
    
//     bumpedGround(groundYPosition){
//         if(!this.grounded){
//             this.speed.y = 0;
//             this.position.y = groundYPosition - this.height;
//             this.setGrounded(true);
//         }        
//     }
    
//     draw(context){
//         context.fillStyle = "rgba(100,190,250,0.2)";
//         for(let i = 0; i < this.lastPositions.length ; i++){
//             // console.log("ITERATING");
//             context.fillRect(this.lastPositions[i].xPos, this.lastPositions[i].yPos, this.width*0.25, this.height);
//             // if(this.lastPositions[i].xPos == 0 ){
//             //     context.fillRect(0,i, this.width,this.height);
//             // }
//         }
//         context.fillStyle = "#ffcd94";
//         context.fillRect(this.position.x, this.position.y, this.width, this.height);
        
//     }
    
//     moveLeft(){
//         this.speed.x = -BASE_VELOCITY;
//     }
//     moveRight(){
//         this.speed.x = BASE_VELOCITY;
//     }    
//     //by default gravity will be applied
//     selectGravity(select){
//         this.select = select;
//     }
//     isMovingLeft(){
//         if(this.speed.x < 0){
//             return true;
//         } else false;
//     }
//     isMovingRight(){
//         if(this.speed.x > 0){
//             return true;
//         } else false;
//     }
    


//     stop(){
//         this.speed.x = 0;
//     }
//     friction(groundCoefficient,deltaTime){
//         let frictionCoeff = 0.003;
//         if(groundCoefficient){
//             frictionCoeff = groundCoefficient;
//         }
//         if(this.position.y >= this.GAME_HEIGHT-this.height-0.5)
//         this.speed.x = Math.sign(this.speed.x) * (Math.abs(Math.abs(this.speed.x) - frictionCoeff*gravityConstant/deltaTime));
//         if(this.speed.x > 0 && this.speed.x < 1)
//             this.speed.x = 0    
//     }
//     setForce(){
//         this.force.y = - JUMP_FORCE;
//     }
//     jump(){
//         if(this.grounded){
//             this.setForce();
//             this.speed.y = this.force.y;
//             console.log(`speed is ${this.speed.y} and force is ${this.force.y}`);
//         }
              
//     }
//     gravity(deltaTime){
//         if(this.select){
//             // this.setForce();
//             // console.log("this force y is "+ this.force.y)
//             // if on ground do not put gravity pls
//             if(!this.grounded){
//                 this.force.y += gravityConstant/deltaTime;
//                 this.speed.y = this.force.y;
//             }
//             // this.force.y = this.force.y;     
//         }
//     }
//     updateLastPositions(){
//         this.internalCounter++;
//         if(this.internalCounter == maxCounter){
//             this.lastPositions.push({
//                 xPos : this.position.x,
//                 yPos : this.position.y
//             });
//             //removes the first element once there are too many
//             if(this.lastPositions.length == maxPositionsMaxLength + 1){
//                 this.lastPositions.shift();
//             }
//             this.internalCounter = 0;
//         }
        
//     }




//     update(deltaTime){
//         if(!deltaTime) return;
//             this.gravity(deltaTime);
//             // console.log(this.speed.y);
//             this.friction(0, deltaTime);
//             this.updateLastPositions();
//             this.position.x += this.speed.x/deltaTime;
//             this.position.y += this.speed.y/deltaTime;
//             console.log(this.grounded);
//         if(this.position.x < 0 ){
//             this.position.x = 0;
//             this.speed.x = 0;
//         } 
//         if(this.position.x > this.GAME_WIDTH - this.width) {
//             this.position.x = this.GAME_WIDTH-this.width;
//             this.speed.x = 0;
//         }
//     }
    

    
// }

export {
    Player
};