document.addEventListener("DOMContentLoaded", function () {
  // Get the modal and modal elements
  var modal = document.getElementById("universalModal");
  var modalImg = document.getElementById("modalImage");
  var captionText = document.getElementById("modalCaption");
  var closeBtn = document.querySelector(".modal .close");

  // Select all images with the class modal-trigger
  var images = document.querySelectorAll(".modal-trigger");

  images.forEach(function (img) {
    img.addEventListener("click", function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    });
  });

  // Close modal when clicking on the close button
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
