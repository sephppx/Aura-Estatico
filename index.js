let iconCart = document.querySelector('.iconCart');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let close = document.querySelector('.close');

iconCart.addEventListener('click', function(){
    if(cart.style.right === '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})

let cartItems = [];

const products = [
    { id: 1, name: 'Producto 1', price: 42.990 , stock: true, image: "Vinilos/Hollywood's Bleeding.jpg"},
    { id: 2, name: 'Producto 2', price: 40.000 , stock: true, image: "Vinilos/1989.jpg"},
    { id: 3, name: 'Producto 3', price: 42.000 , stock: true, image: "Vinilos/Happier That Ever.jpg"},
    { id: 4, name: 'Producto 4', price: 'Agotado' , stock: false, image: "Vinilos/Gabriel.jpg"},
    { id: 5, name: 'Producto 5', price: 50.000 , stock: true, image: "Vinilos/gsc_128444641_5201166_1.jpg"},
    { id: 6, name: 'Producto 6', price: 35.000 , stock: true, image: "Vinilos/the-weeknd-after-hours-600x600.jpg"},
    { id: 7, name: 'Producto 7', price: 41.000 , stock: true, image: "Vinilos/vinilojustice_1080x.jpg"},
    { id: 8, name: 'Producto 8', price: 55.000 , stock: true, image: "Vinilos/kanye-west-graduation-60309902-vinyl-930678_2048x2048.jpg"},
    { id: 9, name: 'Producto 9', price: 28.990 , stock: true, image: "Vinilos/Dont Smile At Me.jpg"},
    { id: 10, name: 'Producto 10', price: 42.000 , stock: true, image: "Vinilos/thank_u_next.jpg"},
    { id: 11, name: 'Producto 11', price: 42.000 , stock: true, image: "Vinilos/Bruno_Mars_-_Unorthdox_Jukebox_-_LP_-_Red_with_Black_Splatter_Vinyl_-_2024_Repress_641df749-2e54-4b60-b792-f8e9d00216a6_grande.jpg"},
    { id: 12, name: 'Producto 12', price: 30.000 , stock: true, image: "Vinilos/Born This Way.jpg"},
];

let listCart = [];


function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();

function addToCart(productId) {
    const selectedProduct = findProductById(productId);

    const isProductInCart = checkIfProductInCart(selectedProduct);

    if (isProductInCart) {
        updateCartItemQuantity(selectedProduct);
    } else {
        addProductToCart(selectedProduct);
    }
    updateCartUI();

    console.log("Producto agregado al carrito:", productId);
}


function findProductById(productId) {
    return products.find(product => product.id === productId);
}

function checkIfProductInCart(product) {
    return cartItems.some(item => item.id === product.id);
}

function addProductToCart(product) {
    cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
    });
}

function updateCartItemQuantity(product) {
    const cartItem = cartItems.find(item => item.id === product.id);
    if (cartItem) {
        cartItem.quantity++;
    }
}

function updateCartUI() {
    const cartCountElement = document.getElementById('cartItemsTotal');

    cartCountElement.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalQuantity');
    let totalQuantity = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="content">
                        <div class="name">${product.name}</div>
                        <div class="price">$${product.price} / 1 product</div>
                    </div>
                    <div class="quantity">
                        <button onclick="changeQuantity(${product.id}, '-')">-</button>
                        <span class="value">${product.quantity}</span>
                        <button onclick="changeQuantity(${product.id}, '+')">+</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
}
function changeQuantity($idProduct, $type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}