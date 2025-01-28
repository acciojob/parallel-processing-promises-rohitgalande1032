// Your JS code here

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
 
  const output = document.getElementById("output");
  const loading = document.getElementById("loading");
  const downloadButton = document.getElementById("download-images-button");

  downloadButton.addEventListener("click", () => {
    loading.textContent = "Loading...";

    Promise.all(
      images.map(
        (image) =>
          new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
          })
      )
    )
      .then((loadedImages) => {
        loading.textContent = ""; // Remove spinner
        loadedImages.forEach((img) => output.appendChild(img));
      })
      .catch((error) => {
        const errorDiv = document.getElementById("error");
        errorDiv.textContent = error.message;
      });
  });
