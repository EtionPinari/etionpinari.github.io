class PlatformGenerator{
    
    constructor(gameWidth, gameHeight, ground){
        this.allPlatforms = [];
        this.maxHeight = 20;
        this.maxWidth = 120;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ground = ground;
        // console.log("fcccc : " +this.allPlatforms);
    }

    buildPlatform(numberPlatforms){
        for(let i = 0 ; i<numberPlatforms ; i++){
            let row = parseInt(11*Math.random());
            let column = parseInt(32 * Math.random());
            this.allPlatforms.push({
                position :{
                    x : row * this.maxWidth,
                    y : column * this.maxHeight,
                },
                
                width : this.maxWidth,
                height : this.maxHeight, 
                color : 'rgb(180, 80 ,200)'
                // color : `rgb(${155*Math.random()+100},${100+155*Math.random()},${100+155*Math.random()})`
            });

        }
    }
    setPlatformHeight( platformHeight ){
        this.maxHeight = platformHeight;
    }
    setPlatformWidth( platformWidth ){
        this.maxWidth = platformWidth;
    }
    
    draw(context){
        for(let i = 0 ; i< this.allPlatforms.length; i++){
   
            context.fillStyle = this.allPlatforms[i].color;
            context.fillRect(this.allPlatforms[i].position.x, this.allPlatforms[i].position.y, this.allPlatforms[i].width,this.allPlatforms[i].height);
            // console.log(`Position X ${this.allPlatforms[i].position.x} , Y ${this.allPlatforms[i].position.y} . WIDTH ${this.allPlatforms[i].width}, HEIGHT${this.allPlatforms[i].height} `)
            // this.allPlatfroms[i].y
        }
    }

    getAllPlatformsArray(){
        return this.allPlatforms;
    }
}

export{
    PlatformGenerator
};