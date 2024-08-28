document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');
    const jsonFile = './src/manifest/assetsList.json';  // Path to the JSON file

    // Create modal for zoomed image
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalImg = document.createElement('img');
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.classList.add('modal-close');
    modal.appendChild(modalImg);
    modal.appendChild(closeButton);
    document.body.appendChild(modal);

    // Function to create and append image elements
    function addImageToGallery(src) {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        const img = document.createElement('img');
        img.src = `./Assets/haldi/${src}`;
        img.alt = src;
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        // Create download button
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.onclick = () => {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = src;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };

        // Create zoom button
        const zoomButton = document.createElement('button');
        zoomButton.textContent = 'Zoom';
        zoomButton.onclick = () => {
            modal.style.display = 'flex';
            modalImg.src = img.src;
        };

        buttonContainer.appendChild(downloadButton);
        buttonContainer.appendChild(zoomButton);
        galleryItem.appendChild(img);
        galleryItem.appendChild(buttonContainer);
        galleryGrid.appendChild(galleryItem);
    }

    // Fetch the JSON file and add images to the gallery
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(images => {
            images.forEach(image => addImageToGallery(image));
        })
        .catch(error => console.error('Error fetching image list:', error));

    // Close modal when close button is clicked
    closeButton.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the image
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
