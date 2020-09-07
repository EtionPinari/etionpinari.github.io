//
const maxFrames = 4;
const N = 1;
const E = 2;
const W = 3;
const S = 4;
class EnemyBall{
    constructor(GAME_WIDTH, GAME_HEIGHT){
        this.radius = 10;
        this.speed = {
            x : 40,
            y : 40
        }
        this.position = {
            x : GAME_WIDTH / 5,
            y : GAME_HEIGHT /5
        }

        this.GAME_HEIGHT = GAME_HEIGHT;
        this.GAME_WIDTH = GAME_WIDTH;
        this.lastPosition = this.position;
        this.internalCounter = 3;
        this.double = null;
    }
    enrage(){
        if(this.speed.x == 40){
            this.speed.x = 80;
            this.speed.y = 80;
        }
    }
    //creates a copy of itself saved in this.double
    //can only store one
    duplicate(){
        if(this.double == null){
            this.double = new EnemyBall(this.GAME_WIDTH,this.GAME_HEIGHT);
            this.double.position.x = this.position.x;
            this.double.position.y = this.position.y;
            this.double.speed.x = -this.speed.x;
        //no speed y on purpose    
        }
    }
    update(deltaTime){
        if(!deltaTime) return;
        this.limitEdges();        
        //move
        this.updateLastPosition();
        this.position.x += this.speed.x / deltaTime;
        this.position.y += this.speed.y / deltaTime;
        if(this.double != null){
            this.double.update(deltaTime);
        }

    }

    updateLastPosition(){
        this.internalCounter++
        if(this.internalCounter == maxFrames){
            this.internalCounter = 0;
            this.lastPosition = this.position;
        }
    }

    limitEdges(){
        if(this.position.x <= this.radius ){
            this.position.x = this.radius;
            this.speed.x = -this.speed.x;
        }
        if(this.position.x >= this.GAME_WIDTH - this.radius){
            this.position.x = this.GAME_WIDTH - this.radius;
            this.speed.x = -this.speed.x ;
        }
        if(this.position.y <= this.radius){
            this.position.y = this.radius;
            this.speed.y = -this.speed.y
        }
        if(this.position.y >= this.GAME_HEIGHT - this.radius){
            this.speed.y = -this.speed.y;
            this.position.y = this.GAME_HEIGHT-this.radius;

        }
    }

    draw(context){
      context.beginPath();
      context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'red';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#003300';
      context.stroke();
      if(this.double != null){
          this.double.draw(context);
      }
    }
    getDouble(){
        return this.double;
    }

    collidedWith(otherObject){
        if(!this.grounded){
            // this.grounded = true;
            let collidedNEWS = this.collisionNEWS(otherObject);
            switch(collidedNEWS){
                case N:
                    this.position.y = otherObject.position.y - this.radius - 0.1  ;
                    this.lastPosition.y = this.position.y ;
                    this.speed.y = -this.speed.y;
                    // this.grounded = true;
                    break;
                case E:
                    this.position.x = otherObject.position.x - 0.01; 
                    this.lastPosition.x = this.position.x;
                    this.speed.x = -this.speed.x;
                    break;
                case W:
                    this.speed.x = -this.speed.x;
                    this.position.x = otherObject.position.x + otherObject.width + this.radius + 0.01;
                    this.lastPosition.x = this.position.x;
                    break;
                case S:
                    this.position.y = otherObject.position.y + otherObject.height + 1; 
                    this.lastPosition.y = this.position.y;
                    this.speed.y = -this.speed.y;
                    break;
                case -1:
                alert("Error");
            }
            // alert(collidedNEWS);
            // this.lastPlatform = otherObject;
        }
    }

    collisionNEWS(otherObject){
        // alert(this.lastPosition.x);
        //checks whether he collided in the north east south or west
        if(this.lastPosition.x + this.radius < otherObject.position.x ){
            // if(this.position.x + this.width >= otherObject.position.x && this.position.x + this.width <= otherObject.position.x + otherObject.width) 
                return E;
        }

        if(this.lastPosition.x + this.radius > otherObject.position.x + otherObject.width){
            // if(this.position.x <= otherObject.position.x + otherObject.width && this.position.x >= otherObject.position.x){
                return W;
            // }
        }
        if(this.lastPosition.y - this.radius <= otherObject.position.y )
            return N;
        // if(this.lastPosition.y >= otherObject.position.y + otherObject.height-1){
        return S;
        // }
        
        // alert( `this last Position : ${this.lastPosition.y} and otherObject floor ${otherObject.position.y + otherObject.height-1}`);
        // return -1;
    }

}

export {
    EnemyBall
};