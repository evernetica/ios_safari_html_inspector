const createModalImageObserver = () => {

    // Function to open the modal
    function openModal(imageArray: [], initialIndex: number) {
        const isModalRendered = document.getElementById('myModal');
        if (!isModalRendered) {
            const modal = document.createElement('div');
            modal.id = 'myModal';
            modal.classList.add('modal');
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.minWidth = '100vw';
            modal.style.height = '100vh';
            modal.style.position = 'absolute';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.zIndex = '999999999999';
            modal.style.margin = 'auto';
            modal.style.backgroundColor = 'rgba(0,0,0,0.8)';

            // Create the modal content (image)
            const modalContent = document.createElement('img');
            modalContent.classList.add('modal-content');
            modalContent.id = 'extImg01';
            modalContent.style.height = '90vh'
            modalContent.style.width = '70vw'
            modalContent.style.objectFit = 'contain'

            // Create the close button element
            const closeButton = document.createElement('span');
            closeButton.classList.add('close');
            closeButton.innerHTML = '&times;';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '15px';
            closeButton.style.right = '35px';
            closeButton.style.color = '#f1f1f1';
            closeButton.style.fontSize = '40px';
            closeButton.style.fontWeight = 'bold';
            closeButton.style.transition = '0.3s';
            closeButton.style.cursor = 'pointer';

            // Add an event listener to close the modal when the close button is clicked
            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
            });

            // Create the previous button element
            const prevButton = document.createElement('button');
            prevButton.classList.add('prev');
            prevButton.id = 'extPrevButton'
            prevButton.innerHTML = '&#10094;';
            prevButton.style.position = 'absolute';
            prevButton.style.top = '50%';
            prevButton.style.left = '-10px';
            prevButton.style.transform = 'translateY(-50%)';
            prevButton.style.border = 'none';
            prevButton.style.backgroundColor = 'transparent';
            prevButton.style.fontSize = '30px';
            prevButton.style.cursor = 'pointer';

            // Add an event listener to go to the previous image


            // Create the next button element
            const nextButton = document.createElement('button');
            nextButton.id = 'extNextButton'
            nextButton.classList.add('next');
            nextButton.innerHTML = '&#10095;';
            nextButton.style.position = 'absolute';
            nextButton.style.top = '50%';
            nextButton.style.right = '-10px';
            nextButton.style.transform = 'translateY(-50%)';
            nextButton.style.border = 'none';
            nextButton.style.backgroundColor = 'transparent';
            nextButton.style.fontSize = '30px';
            nextButton.style.cursor = 'pointer';

            // Add an event listener to go to the next image


            // Append the modal content, close button, prev button, and next button to the modal element
            modal.appendChild(closeButton);
            modal.appendChild(prevButton);
            modal.appendChild(nextButton);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
        }
        const next = document.getElementById('extNextButton')
        const prev = document.getElementById('extPrevButton')
        // const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('extImg01') as HTMLImageElement;
        if (isModalRendered) {
            isModalRendered.style.display = 'flex';
            isModalRendered.style.justifyContent = 'center';
            isModalRendered.style.alignItems = 'center';
        }
        let currentImageIndex = initialIndex || 0;
        // const imgModal = document.getElementById('extImg01')
        next && next.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imageArray.length;
            modalImg.src = imageArray[currentImageIndex];
        });
        prev && prev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
            modalImg.src = imageArray[currentImageIndex];
        });
        modalImg.src = imageArray[currentImageIndex];

    }

    // Append the modal to the body

    return openModal;
}

export default createModalImageObserver;
