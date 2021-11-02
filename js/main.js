// Using interval to run permanent changes on hot sales carrousel
setInterval(function () {
    // Getting elements inside carousel
    let carrousel = document.querySelector('#hotSalesImages');
    let images = carrousel.querySelectorAll('div');
    // Removing active class of current active element
    images[1].classList.remove('active');
    // Creating an array from nodelist to perform actions needed
    let arrayImages = Array.from(images);
    // Putting last element to start of the array
    arrayImages = [arrayImages.slice(-1)[0], ...arrayImages.slice(0,-1)];
    // Setting active class to current middle element
    arrayImages[1].classList.add('active');
    
    // Updating DOM content with nodelist modified
    // Keeping span item to append at the start of the childs
    arrayImages.map( child => carrousel.removeChild(child));
    arrayImages.map( image => carrousel.appendChild(image));

    // Updating text description of the product to active one
    const hotSales = document.querySelector('#hotSales');
    let hotSalesText = hotSales.querySelector('p');
    hotSalesText.innerHTML = '-- ' + arrayImages[1].querySelector('img').alt + ' --';

}, 7000)


