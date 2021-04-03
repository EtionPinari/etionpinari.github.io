alert("WTF IS GOING ON!");
var PicBG = document.getElementById("placeholder-BG");

var elem = document.createElement("img");


/*
INITIALIZE ALL BOO URL STRINGS TO USE AS THE ELEM SOURCE
*/
var booDisney = "https://static.wikia.nocookie.net/disney/images/3/31/Profile_-_Boo.png/revision/latest/scale-to-width-down/633?cb=20190313094050"; 
var booDog = "https://i.pinimg.com/736x/24/5b/76/245b7634d8ac99a6a1e2edfda8e63fc2.jpg";
var booSuperMario = "https://static.wikia.nocookie.net/nintendo/images/e/e4/MK8D_-_Boo_artwork.png/revision/latest?cb=20170113123150&path-prefix=en";
var booScary = "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/boo-scary-halloween-gift-for-a-halloween-ghost-tom-schiesswald.jpg";
var booBats = "https://images-na.ssl-images-amazon.com/images/I/51vfl5nLQKL.jpg";

var booList = [booDisney, booBats, booDog, booSuperMario, booScary];

elem.setAttribute("src", booDisney);
document.alert(elem);
for(pic in PicBG){
	pic.appendChild(elem);
}