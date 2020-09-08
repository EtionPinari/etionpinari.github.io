class PlatformGenerator{
    
    constructor(gameWidth, gameHeight, ground, noMushroom, mushroom){
        this.allPlatforms = [];
        this.maxHeight = 25;
        this.maxWidth = 125;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.ground = ground;
        this.noMushroom = noMushroom;
        this.mushroom = mushroom;
        // console.log("fcccc : " +this.allPlatforms);
    }

    buildPlatform(numberPlatforms){
        for(let i = 0 ; i<numberPlatforms ; i++){
            let row = parseInt(10*Math.random());
            let column = parseInt(24 * Math.random());
            let luck = Math.random();
            let image = null
            if(luck <= 0.15){
                image = this.mushroom;
            } else {
                image = this.noMushroom;
            }
            if(this.includesPlatform(row,column)){
                i--;
                continue;
            }
            this.allPlatforms.push({
                position :{
                    x : row * this.maxWidth-5,
                    y : 2*this.maxHeight + column * this.maxHeight-5,
                },
                image : image,
                width : this.maxWidth+1,
                height : this.maxHeight, 
            });

        }
        console.log(this.allPlatforms);
    }

    includesPlatform(row,column){
        for(let i = 0; i<this.allPlatforms.length; i++){
            if(this.allPlatforms[i].position.x == row * this.maxWidth-5)
                if(this.allPlatforms[i].position.y == 2*this.maxHeight + column * this.maxHeight - 5)
                    return true;    
                // alert("True");

        }
        return false;
    }
    setPlatformHeight( platformHeight ){
        this.maxHeight = platformHeight;
    }
    setPlatformWidth( platformWidth ){
        this.maxWidth = platformWidth;
    }
    getRandomPlatform(){
        return this.allPlatforms[  (parseInt(this.allPlatforms.length * Math.random())) ];
    }
    draw(context){
        for(let i = 0 ; i< this.allPlatforms.length; i++){
            
   
            // context.fillStyle = 'rgb(190, 80 ,200)';
            // context.fillRect(this.allPlatforms[i].position.x, this.allPlatforms[i].position.y, this.maxWidth,this.maxHeight);
            if(this.allPlatforms[i].image == this.noMushroom){
                context.drawImage(this.noMushroom, this.allPlatforms[i].position.x-16,this.allPlatforms[i].position.y-65*1.3, 200*0.8, 200*1.28);
            } else {
                context.drawImage(this.mushroom, this.allPlatforms[i].position.x-50, this.allPlatforms[i].position.y-110, 200*1.2, 200*1.8 )
            }
            // context.drawImage(this.noMushroom,this.allPlatforms[i].position.x-30,this.allPlatforms[i].position.y-70);
            
            // context.lineWidth = 1;
            // context.strokeStyle = '#333';
            // context.strokeRect(this.allPlatforms[i].position.x, this.allPlatforms[i].position.y, this.maxWidth, this.maxHeight);
            
        }
    }

    getAllPlatformsArray(){
        return this.allPlatforms;
    }
}

export{
    PlatformGenerator
};