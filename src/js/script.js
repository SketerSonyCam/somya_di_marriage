document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const jsonFile = './src/manifest/assetsList.json';  // Path to the JSON file

    // Function to create and append image elements
    function addImageToGallery(src) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = `./Assets/haldi/${src}`;
        img.alt = src;
        galleryItem.appendChild(img);
        galleryGrid.appendChild(galleryItem);
    }

    // Fetch the JSON file and add images to the gallery
    fetch(jsonFile)
        .then(response => response.json())
        .then(images => {
            images.forEach(image => addImageToGallery(image));
        })
        .catch(error => console.error('Error fetching image list:', error));
});
