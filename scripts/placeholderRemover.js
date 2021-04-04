
var PicBG = document.getElementById("placeholder-BG");

var elem = document.createElement("img");

console.log(PicBG);
/*
INITIALIZE ALL BOO URL STRINGS TO USE AS THE ELEM SOURCE
*/
var booDisney = "https://images-na.ssl-images-amazon.com/images/I/51857ZP84DL._SX343_BO1,204,203,200_.jpg"; 
var booDog = "https://i.pinimg.com/736x/24/5b/76/245b7634d8ac99a6a1e2edfda8e63fc2.jpg";
var booSuperMario = "https://i.pinimg.com/564x/6f/57/99/6f57998a706f84d6c42032637e76ed05.jpg";
var booScary = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/boo-scary-halloween-gift-for-a-halloween-ghost-tom-schiesswald.jpg";
var booBats = "https://images-na.ssl-images-amazon.com/images/I/51vfl5nLQKL.jpg";

var booList = [booDisney, booBats, booDog, booSuperMario, booScary];
var index = getRandomIntInclusive(0,booList.length-1);
elem.setAttribute("src", booList[index]);
elem.setAttribute("width", 400);
elem.setAttribute("height", 600);
PicBG.appendChild(elem);







				//FUNCTIONS//
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}