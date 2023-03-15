const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = "ahdhj-aNVJz_8SJ1zSt2atho0MJKvtMIQskDL3eXp1A";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

function imageLoaded() {
  console.log("Image Loaded");
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready", ready);
  }
}
//Helper function set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  console.log("totalImages", totalImages);
  // Run function for each photos in photo array
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unspash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000
  ) {
    getPhotos();
    // console.log("load more");
  }
});

// On Load
getPhotos();
