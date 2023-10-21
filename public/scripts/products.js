if (localStorage.getItem('selectedProduct')) {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    const productId = selectedProduct.id;
    const apiUrl = `https://fakestoreapi.com/products/${productId}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(product => {
            console.log('Fetched single item:', product);

            const selectedProductDiv = document.querySelector('.selectedProduct');
            selectedProductDiv.innerHTML = ''; 

            const image = document.createElement('div');
            image.classList.add('image-container');
            image.innerHTML = `<img src="${product.image}" alt="${product.title}">`;

            const productDiv = document.createElement('div');
            productDiv.classList.add('product-container');

            const details = document.createElement('div');
            details.classList.add('detail-container');
            details.innerHTML = `
                <h5>${product.category}</h5>
                <h2>${product.title}</h2>
                <h4>${product.description}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button>Add to Cart</button>
            `;

            productDiv.appendChild(image);
            productDiv.appendChild(details);
            selectedProductDiv.appendChild(productDiv);
        })
        .catch(error => {
            console.error('Error fetching single item:', error);
        });
} else {
    console.log('No product selected in localStorage.');
}





