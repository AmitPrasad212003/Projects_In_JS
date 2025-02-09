document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 19.99 },
        { id: 3, name: "Product 3", price: 59.99 },
    ];

    let cart = JSON.parse(localStorage.getItem("carts")) || []; // Change to let, so we can modify it
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkOutBtn = document.getElementById("checkout-btn");

    // Display Products
    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button> 
        `;
        productList.appendChild(productDiv);
    });
    
    // display cart items
    if (cart.length > 0) {
        emptyCartMessage.classList.add("hidden");
        renderCart()
        cartTotalMessage.classList.remove("hidden");
    }else{        
        emptyCartMessage.classList.remove("hidden");
    }

    // Add to cart event
    productList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    // Remove from cart event
    cartItems.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    function addToCart(product) {
        cart.push(product);
        saveCarts();
        renderCart();

    }

    function removeFromCart(productId) {
        const index = cart.findIndex(product => product.id === productId);
        if (index !== -1) {
            cart.splice(index, 1); // Modify the array without reassigning
        }
        saveCarts()
        renderCart();

    }

    function renderCart() {
        if(cart.length === 0){
            cartItems.innerHTML = `
            <p id="empty-cart">Your cart is empty.</p>
        `;
        }else{
            cartItems.innerHTML = "";
        }
       
        let totalPrice = 0;

        if (cart.length > 0) {
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");

            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                    ${item.name} - $${item.price.toFixed(2)}
                    <button data-id="${item.id}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            cartTotalMessage.classList.add("hidden");
            emptyCartMessage.classList.remove("hidden");
            totalPriceDisplay.textContent = `$0.00`;
        }
    }

    checkOutBtn.addEventListener('click', () => {
        cart = []; // Empty cart
        alert("Checkout successful!");
        saveCarts();
        renderCart();
        // cartItems.innerHTML = `
        //     <p id="empty-cart">Your cart is empty.</p>
        // `;

        
       
        
    });

    function saveCarts(){
        localStorage.setItem('carts',JSON.stringify(cart));
    }
});
