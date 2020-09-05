export default class Ground {
    constructor(gameWidth, gameHeight){
        this.width = gameWidth;
        this.height = 40;

        this.position =  
        {
            x : 0,
            y : gameHeight - this.height
        }
    }

    draw(ctx){
        ctx.fillRect(this.position.x,this.position.y, this.width, this.height);
    }
}

export {makeRed,
        removeRed,
        changeBodyTag,
        Ground
    };



function makeRed(event){
    if(event.target.className.includes("screen")){
    console.log(event);
    alert("you hovered on the box");
    event.target.style.border = "solid blue 30px";
    event.target.style.color = "";
    event.target.style.backgroundColor = "red";
    event.target.style.backgroundImage = "";
    }
}
function removeRed(event){
    if(event.target.className.includes("screen")){
        console.log(event);
        alert("you moved out of the box");
        event.target.style.border = "";
        event.target.style.color = "";
        event.target.style.backgroundColor = "white";
        event.target.style.backgroundImage = "";
    }
}
function changeBodyTag(contDiv){
    if(document.body.className == "whitened")
    {
        darken(contDiv);
    }
    else{
        whiten(contDiv);
    }// console.log(document.body);
}
function darken(contDiv){
    document.body.className = "darkened";
    contDiv.className = "content-black";
}
function whiten(contDiv){
    contDiv.className = "content-white";
    document.body.className = "whitened";
}