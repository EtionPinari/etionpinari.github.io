class CollisionDetector{
    constructor(){

    }

    checkCollision(thisObject,otherObject){
        if(!this.isBall(thisObject))
        if  (
            ((thisObject.position.x + thisObject.width >= otherObject.position.x && thisObject.position.x + thisObject.width <= otherObject.position.x + otherObject.width) ||
            (thisObject.position.x <= otherObject.position.x + otherObject.width && thisObject.position.x >= otherObject.position.x )) &&
            ((thisObject.position.y + thisObject.height >= otherObject.position.y && thisObject.position.y + thisObject.height <= otherObject.position.y + otherObject.height) ||
            (thisObject.position.y <= otherObject.position.y + otherObject.height && thisObject.position.y >= otherObject.position.y))
            )
        {
            return true;
        }

        //if it is ball then
        if(
            //if this object is within the x-width of other object
            ((thisObject.position.x - 1*thisObject.radius >= otherObject.position.x && thisObject.position.x - 1* thisObject.radius <= otherObject.position.x + otherObject.width)
            && (thisObject.position.y + thisObject.radius >= otherObject.position.y && thisObject.position.y + thisObject.radius <=otherObject.height + otherObject.position.y))
            ||(
                (thisObject.position.x <= otherObject.position.x + otherObject.width && thisObject.position.x >= otherObject.position.x) 
            &&  (thisObject.position.y + thisObject.radius >= otherObject.position.y && thisObject.position.y + thisObject.radius <= otherObject.height + otherObject.position.y)
            )
            ||(
                (thisObject.position.y + thisObject.radius*0 >= otherObject.position.y && thisObject.position.y + thisObject.radius*0 <= otherObject.height + otherObject.position.y) 
            &&  (thisObject.position.x + thisObject.radius >= otherObject.position.x && thisObject.position.x + thisObject.radius <= otherObject.position.x + otherObject.width))
            || ((thisObject.position.y >= otherObject.position.y && thisObject.position.y <= otherObject.height + otherObject.position.y) 
            &&  (thisObject.position.x + thisObject.radius >= otherObject.position.x && thisObject.position.x + thisObject.radius <= otherObject.position.x + otherObject.width)

            )
            )
            return true;
        return false;
    }
    isBall(thisObject){
        if(!thisObject.radius)
            return false;
        return true;
    }
    /**
     * checks if thisObject collided with otherObject down face
     * @param {the object who is colliding} thisObject 
     * @param {the object being collided with (immovable most of the time)} otherObject 
     */
    collidedDown(thisObject, otherObject){

    }

    /**
     * checks if thisObject collided with otherObject up face
     * @param {the object who is colliding} thisObject 
     * @param {the object being collided with (immovable most of the time)} otherObject 
     */
    collidedUp(thisObject, otherObject){
        if(( thisObject.position.x + thisObject.width >= otherObject.position.x || thisObject.position.x + thisObject.width >= otherObject.position.x + otherObject.width) &&
            thisObject.position.y + thisObject.height >= otherObject.position.y &&
            thisObject.position.y + thisObject.height <= otherObject.position.y + otherObject.height)
            {
                alert("Collided up side");
                return true;
            }
        return false;
    }


}
export{
    CollisionDetector
};