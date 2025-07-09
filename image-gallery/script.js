
    let images = JSON.parse(localStorage.getItem("galleryImages")) || [
     localStorage.setItem(dndnd)
    ];

    let currentIndex = 0;
    let filteredImages = [];

    const gallery = document.getElementById("gallery");
    const fullView = document.getElementById("full-view");
    const mainImage = document.getElementById("main-image");
    const related = document.getElementById("related");

    function showGallery() {
      gallery.innerHTML = "";
      images.forEach((img, index) => {const imageContainer = document.createElement("div");
imageContainer.className = "image-item";

const image = document.createElement("img");
image.src = img.src;
image.alt = `Image ${index + 1}`;
image.onclick = () => openImage(index);

imageContainer.appendChild(image);
gallery.appendChild(imageContainer);

      });
    }
    
function showForm() {
  const form = document.getElementById("form-container");
  const gallery = document.getElementById("gallery");
  if (form.style.display === "flex") {
    form.style.display = "none";
    gallery.classList.remove("blur");
    document.body.style.overflow = ""; // enable scrolling
  } else {
    form.style.display = "flex";
    gallery.classList.add("blur");
    document.body.style.overflow = "hidden"; // disable scrolling
  }
}


function addImage() {
  const urlInput = document.getElementById("image-url");
  const fileInput = document.getElementById("image-file");
  const url = urlInput.value.trim();
  const file = fileInput.files[0];



  if (url) {
    // If URL is given, use it
   images.push({ src: url });

    saveAndResetForm();
  } else if (file) {
    // If file is selected, read and use it
    const reader = new FileReader();
    reader.onload = function (e) {
     images.push({ src: e.target.result });
 // base64 image
      saveAndResetForm();
    };
    reader.readAsDataURL(file);
  } else {
    alert("Please enter an image URL or select a file.");
  }
}


function saveAndResetForm() {
  localStorage.setItem("galleryImages", JSON.stringify(images));
  showGallery();

  document.getElementById("image-url").value = "";
  document.getElementById("image-file").value = "";

  const form = document.getElementById("form-container");
  const gallery = document.getElementById("gallery");

  form.style.display = "none";
  gallery.classList.remove("blur");
  document.body.style.overflow = ""; // enable scrolling
}

function openImage(index) {
  currentIndex = index;
filteredImages = [...images];

  currentIndex = filteredImages.findIndex(img => img.src === images[index].src);
  showImage(currentIndex);
  gallery.classList.add("blur");           // Add blur before hiding
  fullView.style.display = "flex";
  gallery.style.pointerEvents = "none"; 
  document.getElementById("backToGallery").style.display = "block";
document.getElementById("prev-image").style.display = "block";
document.getElementById("next-image").style.display = "block";
document.body.style.overflow = "hidden"; // disables page scroll

   // So user can't interact with blurred background
}

function backToGallery() {
  fullView.style.display = "none";
  gallery.classList.remove("blur");        // Remove blur
  gallery.style.pointerEvents = "auto"; 
  document.getElementById("backToGallery").style.display = "none";
document.getElementById("prev-image").style.display = "none";
document.getElementById("next-image").style.display = "none";
document.body.style.overflow = ""; // re-enables page scroll

   
}

         function showImage(index) {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = filteredImages[index].src;
        mainImage.alt = `Image ${index + 1}`;
        mainImage.style.opacity = 1;
      }, 300);
      showRelatedImages(index);
    }
    function showRelatedImages(index) {
      related.innerHTML = "";
      filteredImages.forEach((img, i) => {
        if (i !== index) {
          const image = document.createElement("img");
          image.src = img.src;
          image.onclick = () => {
            currentIndex = i;
            showImage(i);
          };
          related.appendChild(image);
        }
      });
    }


    function prevImage() {
      currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
      showImage(currentIndex);
    }

    function nextImage() {
      currentIndex = (currentIndex + 1) % filteredImages.length;
      showImage(currentIndex);
    }

  function deleteImage() {
  const imageToDelete = filteredImages[currentIndex];
  images = images.filter(img => img.src !== imageToDelete.src);
  localStorage.setItem("galleryImages", JSON.stringify(images));

  // Refresh the filtered images again
  const group = imageToDelete.group;
  filteredImages = images.filter(img => img.group === group);

  if (filteredImages.length === 0) {
    backToGallery(); // Optional: go back only if no images left
    showGallery();
    return;
  }

  currentIndex = 0;
  showImage(currentIndex);
  showGallery(); // update the thumbnail gallery behind
}

function downloadImage() {
  const imgSrc = filteredImages[currentIndex].src;

  if (imgSrc.startsWith("data:image")) {
    // base64 image
    const link = document.createElement("a");
    link.href = imgSrc;
    link.download = "downloaded-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    // external image
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(image, 0, 0);
      canvas.toBlob(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "downloaded-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, "image/png");
    };

    image.onerror = () => {
      alert("Download failed. The image might be protected by the source website (CORS).");
    };
  }
}



    showGallery();