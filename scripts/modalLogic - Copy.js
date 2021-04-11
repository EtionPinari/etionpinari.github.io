var modal = document.getElementById("myModal-2");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById("myImg-2");
var modalImg = document.getElementById("img02");
var captionText = document.getElementById("caption-2");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-2")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}