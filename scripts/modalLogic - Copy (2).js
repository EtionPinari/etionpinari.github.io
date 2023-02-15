var modal = document.getElementById("myModal-3");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg-3");
var modalImg = document.getElementById("img03");
var captionText = document.getElementById("caption-3");
img.onclick = function(){
  modal.style.display = "block";
  modal.style.textAlign = "center";
  modal.style.alignContent = "center";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-3")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}