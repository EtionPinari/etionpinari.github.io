const leftArrow = 37;
const upArrow = 38;
const rightArrow = 39;
const downArrow = 40;
const spaceBar = 32;
const w = 87;
const a = 65;
const s = 83;
const d = 68;
class Input{
    constructor(player){
        //when key down start moving
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
                event.preventDefault();
            break;
        }
        }
        );
        //when key released, stop moving
        addEventListener('keyup', (event) => {
            switch(event.keyCode){
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
            }
        });
    }
}
export {Input};