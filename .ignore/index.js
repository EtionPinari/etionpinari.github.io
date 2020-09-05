import {
    adder, subtractor, MathFunction
} from './subFile.js';
import { changeBodyTag } from '../scripts/gameLogic/ground.js';
// import {MathFunctions} from './subFile.js';
// let mf = new MathFunctions(10,8);
// alert(adder(1,2));
// alert(subtractor(2,0));
let mf = new MathFunction(2.5,3);
// alert(mf.giveSum());
let fakeButton = document.querySelector(".redText");
// console.log(fakeButton);
fakeButton.addEventListener('click', (e) => callAdder(1,2));
// function callAdder(numOne, numTwo){
    // alert(1+2);
// }

let arrayName = [];
for(let i = 0 ; i<10 ; i++){
    arrayName.push({
        x: i + 1,
        y: 2*i,
        index : i
    })
}
alert("check log for array struct");
console.log(arrayName);
for(let i = 0; i<arrayName.length; i++){
    console.log(`Index is : ${arrayName[i].index}, x is ${arrayName[i].x}, y is ${arrayName[i].y}`);
}
// console.log();