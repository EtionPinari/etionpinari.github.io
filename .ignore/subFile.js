function adder(x,y){
        return x+y;
    }

function subtractor(x,y){
        return x-y;
}
class MathFunction {
    x;
    y;
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    giveSum(){
        return this.x+this.y;
    }
}

export{
    adder,
    MathFunction,
    subtractor
};

