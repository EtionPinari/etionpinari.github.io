const suffix = "App-1";
// everything should be a unique ID
const idModal = "myModal-" + suffix;
const idImg = "myImg-" + suffix;
const idModalImage = "img" + suffix;
const idCaption = "caption" + suffix;
const nameCloseButton = "close-" + suffix;


var modal = document.getElementById(idModal);

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById(idImg);
var modalImg = document.getElementById(idModalImage);
var captionText = document.getElementById(idCaption);
img.onclick = function(){
  modal.style.display = "block";
  modal.style.textAlign = "center";
  modal.style.alignContent = "center";
  modalImg.src = this.src;
  // Extra code
  modalImg.style.width = "22%";
  modalImg.style.height = "auto";
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName(nameCloseButton)[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}