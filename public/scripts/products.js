//Products by Id

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

            const details = document.createElement('div');
            details.classList.add('detail-container');
            details.innerHTML = `
                <h5>${product.category}</h5>
                <h2>${product.title}</h2>
                <h4>${product.description}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button id="btn">Add to Cart</button>
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



function truncator(description) {
    const words = description.split(' ');
    if (words.length > 2) {
        const truncatedDescription = words.slice(0, 7).join(' ') + '...';
        return truncatedDescription;
    }
    return description;
}

function clickcart(){
    document.getElementById('btn').addEventListener('click',(e)=>{
        alert('almost there')
    })
}
clickcart();


//All products
// function fetchAndDisplayProducts() {
//     fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .then(products => {
//             const productListDiv = document.querySelector('.Products');
//             products.forEach(product => {
//                 const productsDiv = document.createElement('div');
//                 productsDiv.classList.add('products-container');
//                 productsDiv.innerHTML = `
//                 <a href="products.html">
//                 <h2>${product.title}</h2>
//                 <img src="${product.image}" alt="${product.title}">
               
//                 <p class="description">${truncator(product.description)}</p>
//                 <p class="price">Ksh ${product.price}</p>
//                 <p class="category"> ${product.category}</p>
//                 <button class= "cartBtn">Add to Cart</button>
//                 </a>
//                `;

//                 productListDiv.appendChild(productsDiv);

//                 const productLink = productsDiv.querySelector('a');
//                 productLink.addEventListener('click', (e) => {
//                     e.preventDefault();
//                     ProductClick(product);
//                 });
//             });
//         });
// }

// function ProductClick(product) {
//     localStorage.setItem('product', JSON.stringify(product));
//     window.location.href = "/views/products.html";
// }

// window.onload = fetchAndDisplayProducts;

// var cartCountElement = document.getElementById('cart-count');
// // Get the button element you want to attach the click event to
// var button = document.getElementById('btn'); // Replace 'your-button-id' with the actual button ID or selector

// // Add a click event listener to the button
// button.addEventListener('click', function() {
//     // Get the current cart count
//     var currentCount = parseInt(cartCountElement.textContent);

//     // Update the cart count
//     var newCount = currentCount + 1;

//     // Update the cart count element
//     cartCountElement.textContent = newCount;
// });
















