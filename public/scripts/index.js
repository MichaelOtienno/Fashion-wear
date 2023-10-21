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
                <button class="updatecart">Add to Cart</button>
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
    localStorage.setItem('product', JSON.stringify(product));
    window.location.href = "/views/products.html";
}

//Category
document.getElementById('category').addEventListener('change', filterProducts);

function filterProducts() {
    const selectedCategory = document.getElementById('category').value;
    const productListDiv = document.querySelector('.Products');

    let apiUrl = 'https://fakestoreapi.com/products';
    if (selectedCategory) {
        apiUrl = `https://fakestoreapi.com/products/category/${selectedCategory}`;
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(products => {
            // Clear existing products
            productListDiv.innerHTML = '';

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
                <button class="updatecart">Add to Cart</button>
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

window.onload = fetchAndDisplayProducts;

//search
document.getElementById('searchInput').addEventListener('input', performSearch);
function performSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const productListDiv = document.querySelector('.Products');

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(products => {
            const filteredProducts = products.filter(product => {
                return product.title.toLowerCase().includes(searchInput) ||
                    product.description.toLowerCase().includes(searchInput);
            });

            productListDiv.innerHTML = '';

            filteredProducts.forEach(product => {
                const productsDiv = document.createElement('div');
                productsDiv.classList.add('products-container');
                productsDiv.innerHTML = `
                <a href="products.html">
                <h2>${product.title}</h2>
                <img src="${product.image}" alt="${product.title}">
                <p class="description">${truncator(product.description)}</p>
                <p class="price">Ksh ${product.price}</p>
                <p class="category"> ${product.category}</p>
                <button class="updatecart">Add to Cart</button>
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










