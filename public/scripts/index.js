function truncator(description) {
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
                const productsDiv = document.createElement('div');
                productsDiv.classList.add('products-container');
                productsDiv.innerHTML = `
                <a href="products.html">
                <h2>${product.title}</h2>
                <img src="${product.image}" alt="${product.title}">
               
                <p class="description">${truncator(product.description)}</p>
                <p class="price">Ksh ${product.price}</p>
                <p class="category"> ${product.category}</p>
                <button>Add to Cart</button>
                </a>
               `;

                productListDiv.appendChild(productsDiv);

                const productLink = productsDiv.querySelector('a');
                productLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    ProductClick(product);
                });
            });
        });
}

function ProductClick(product) {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    window.location.href = "/views/products.html";
}

window.onload = fetchAndDisplayProducts;






