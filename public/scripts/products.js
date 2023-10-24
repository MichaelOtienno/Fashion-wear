if (localStorage.getItem('product')) {
    const selectedProduct = JSON.parse(localStorage.getItem('product'));
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

            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy Now';
            buyButton.classList.add('buy-button');
            buyButton.addEventListener('click', clickcart);

            const details = document.createElement('div');
            details.classList.add('detail-container');
            details.innerHTML = `
                <h5>${product.category}</h5>
                <h2>${product.title}</h2>
                <h4>${product.description}</h4>
                <p>$${product.price.toFixed(2)}</p>
            `;

            productDiv.appendChild(image);
            details.appendChild(buyButton);
            productDiv.appendChild(details);
            selectedProductDiv.appendChild(productDiv);

            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const cartCountElement = document.getElementById('cart-count');
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalQuantity;

            function clickcart(e) {
                e.preventDefault();
                e.stopPropagation();

                const selectedProduct = JSON.parse(localStorage.getItem('product'));
                let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                const existingItem = cartItems.find(item => item.id === selectedProduct.id);

                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    cartItems.push({
                        id: selectedProduct.id,
                        quantity: 1,
                        image: selectedProduct.image,
                        description:selectedProduct.description,
                        title:selectedProduct.title,
                        price:selectedProduct.price
                    });
                }

                const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
                cartCountElement.textContent = totalQuantity;
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
            }
        })
        .catch(error => {
            console.error('Error fetching single item:', error);
        });
} else {
    console.log('No product selected in localStorage.');
}

// All products
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
                <button class= "cartBtn">Add to Cart</button>
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

window.onload = fetchAndDisplayProducts;




















