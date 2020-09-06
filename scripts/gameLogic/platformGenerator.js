class PlatformGenerator{
    
    constructor(gameWidth, gameHeight, ground){
        this.allPlatforms = [];
        this.maxHeight = 25;
        this.maxWidth = 125;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ground = ground;
        // console.log("fcccc : " +this.allPlatforms);
    }

    buildPlatform(numberPlatforms){
        for(let i = 0 ; i<numberPlatforms ; i++){
            let row = parseInt(10*Math.random());
            let column = parseInt(23 * Math.random());
            this.allPlatforms.push({
                position :{
                    x : row * this.maxWidth-5,
                    y : 2*this.maxHeight + column * this.maxHeight-5,
                },
                
                width : this.maxWidth+1,
                height : this.maxHeight+1, 
                color : 'rgb(190, 80 ,200)'
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
            context.fillRect(this.allPlatforms[i].position.x, this.allPlatforms[i].position.y, this.maxWidth,this.maxHeight);
            
            context.lineWidth = 1;
            context.strokeStyle = '#333';
            context.strokeRect(this.allPlatforms[i].position.x, this.allPlatforms[i].position.y, this.maxWidth, this.maxHeight);
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