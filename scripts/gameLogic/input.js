const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;
const spaceBar = 32;
const w = 87;
const a = 65;
const s = 83;
const d = 68;
const p = 80;
const GAME_CONSTANT  = {
    PAUSE : 0,
    RUNNING : 1,
    MENU : 2,
    GAMEOVER : 3
};
class Input{
    constructor(player, gameState){
        //when key down start moving
        this.gameState = gameState;
        addEventListener('keydown',
        (event) => {
            // alert(event);
            // console.log(event);
            
            switch(event.keyCode){
            
            case leftArrow:
            case a:
                player.moveLeft();
                event.preventDefault();
                // alert("left");
            break;
            case rightArrow:
            case d:
                event.preventDefault();
                player.moveRight();
                // alert("right");
            break;
            case upArrow:
            case w:
            case spaceBar:
                event.preventDefault();
                player.jump();
            break;
            case downArrow:
            case s:
                player.crouch();
                event.preventDefault();
            break;
            case p:
                this.togglePause();
                break;
            }
        }
        );
        //when key released, stop moving
        addEventListener('keyup', (event) => {
            switch(event.keyCode){
                case upArrow:
                case w:
                case spaceBar:
                    player.slowJump();
                    break;
                case leftArrow:
                case a:
                    if(player.isMovingLeft())
                            player.stop();
                    break;
                case rightArrow:
                case d:
                    if(player.isMovingRight()){
                        player.stop();
                        // alert("Called player stop");
                    }
                    break;
                case downArrow:
                case s:
                    player.stopCrouching();
                    break;
            }
        });
    }

    togglePause(){
        if(this.gameState == GAME_CONSTANT.PAUSE){
            this.gameState = GAME_CONSTANT.RUNNING;
        } else if (this.gameState == GAME_CONSTANT.RUNNING){
            this.gameState = GAME_CONSTANT.PAUSE;
        }
    }
}
export {Input};