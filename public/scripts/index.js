const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartCountElement = document.getElementById('cart-count');
const productListDiv = document.querySelector('.Products');

function truncator(description) {
    return description.split(' ').slice(0, 7).join(' ') + (description.split(' ').length > 7 ? '...' : '');
}

function createProductElement(product) {
    const productsDiv = document.createElement('div');
    productsDiv.classList.add('products-container');
    productsDiv.innerHTML = `
        <a href="products.html">
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p class="description">${truncator(product.description)}</p>
            <p class="price">Ksh ${product.price}</p>
            <p class="category"> ${product.category}</p>
        </a>
        <button class="updatecart">Add to Cart</button>
    `;
    productListDiv.appendChild(productsDiv);

    const productLink = productsDiv.querySelector('a');
    productLink.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('product', JSON.stringify(product));
        window.location.href = "/views/products.html";
    });

    const addToCartButton = productsDiv.querySelector('.updatecart');
    addToCartButton.addEventListener('click', () => {
        const cartItemIndex = cart.findIndex(item => item.id === product.id);
        if (cartItemIndex !== -1) {
            cart[cartItemIndex].quantity++;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
                description: product.description
            });
        }
        updateCartCount();
        localStorage.setItem('cartItems', JSON.stringify(cart));
    });
}

function updateCartCount() {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;
}

function fetchAndDisplayProducts(apiUrl) {
    fetch(apiUrl)
        .then(res => res.json())
        .then(products => {
            productListDiv.innerHTML = '';
            products.forEach(product => createProductElement(product));
        });
}
// category
document.getElementById('category').addEventListener('change', () => {
    const selectedCategory = document.getElementById('category').value;
    const apiUrl = selectedCategory ? `https://fakestoreapi.com/products/category/${selectedCategory}` : 'https://fakestoreapi.com/products';
    fetchAndDisplayProducts(apiUrl);
});
// search
document.getElementById('searchInput').addEventListener('input', () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const apiUrl = 'https://fakestoreapi.com/products';
    fetch(apiUrl)
        .then(res => res.json())
        .then(products => {
            productListDiv.innerHTML = '';
            products.filter(product => product.title.toLowerCase().includes(searchInput) || product.description.toLowerCase().includes(searchInput))
                .forEach(product => createProductElement(product));
        });
});

window.onload = () => {
    fetchAndDisplayProducts('https://fakestoreapi.com/products');
    updateCartCount(); 
};
