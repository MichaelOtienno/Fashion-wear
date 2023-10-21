
function truncateDescription(description) {
    const words = description.split(' ');
    if (words.length > 2) {
        const truncatedDescription = words.slice(0, 7).join(' ') + '...';
        return truncatedDescription;
    }
    return description; 
}

 function fetchAndDisplayProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const productListDiv = document.querySelector('.Products');
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product-container'); 
                productDiv.innerHTML = `
                <a href="javascript:void(0);">
                <h2>${product.title}</h2>
                <img src="${product.image}" alt="${product.title}">
               
                <p class="description">${truncateDescription(product.description)}</p>
                <p class = "price">Ksh ${product.price}</p>
                <p class = "category"> ${product.category}</p>
                <button>Add to Cart</button>
                </a>
               `
                productListDiv.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Call the function when the page loads
window.onload = fetchAndDisplayProducts;

