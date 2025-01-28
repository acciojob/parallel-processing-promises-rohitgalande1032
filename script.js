// Your JS code here
const output = document.getElementById("output");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(image) {
  return new Promise((resolve, reject) => {
	  if(image.url){
		  resolve(image);
	  } else{
		  reject(`Failed to load image's URL: ${image.url}`)
	  }
     // Resolves with the image element if successfully loaded
    
  });
}
 
function downloadAllImages(images) {
  loading.innerHTML = "Loading..."; // Display the loading spinner
  output.innerHTML = ""; // Clear previous content
  errorDiv.innerHTML = ""; // Clear error messages

  // Create an array of promises to download images
  const downloadPromises = images.map((image) => downloadImage(image));

  // Use Promise.all to handle parallel processing
  Promise.all(downloadPromises)
    .then((loadedImages) => {
      // On successful resolution, display all images
      loading.innerHTML = ""; // Remove loading spinner
      loadedImages.forEach((img) => {
        output.innerHTML += `<img src = ${img.url}>` // Append each image to the output div
      });
    })
    .catch((error) => {
      // On error, remove the spinner and display the error
      loading.innerHTML = "";
      errorDiv.innerHTML = error;
    });
}

downloadAllImages(images);
