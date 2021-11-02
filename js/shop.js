// Activating BS tooltips
document.addEventListener("DOMContentLoaded", function(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function(element){
        return new bootstrap.Tooltip(element);
    });
});

// Exercise 11
// Move this variable to a json file and load the data in this js
var products;
fetch('../data/products.json')
    .then( response => response.json())
        .then( json => products = json);

var cartList = [];
var cart = [];
var subtotal = {
    ingredients: {
        value: 0, 
        discount: 0
    },
    toppings: {
        value: 0, 
        discount: 0
    },
    stuff: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    }
};
var total = 0;

// Exercise 1
function addToCartList(id) {
    const productSelected = products[id - 1];
    cartList.push(productSelected);
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

// Exercise 2
function cleanCart() {
    cartList = [];
}

// Exercise 3
function calculateSubtotals() {
    // 1. Create a for loop on the "cartList" array 
    cartList.map( product => {
        subtotal[product.type].value = subtotal[product.type].value + product.price;
    })
    // 2. Implement inside the loop an if...else or switch...case to add the quantities of each type of product, obtaining the subtotals: subtotalGrocery, subtotalBeauty and subtotalClothes

}

// Exercise 4
function calculateTotal() {
    // Calculate total price of the cart either using the "cartList" array

    // Guard clause checking that card is empty after remove last product
    if (cart.length === 0) {
        total = 0;
        return;
    }
    // [David] Getting values (objects) from subtotals object. Then extracting value (type is not interesting at this point)
    // and reducing value to sum all subtotals to get total amount.
    total = cart
        .map(product => product.subtotalWithDiscount)
            .reduce((previousValue, currentSubtotal) => {
                return previousValue + currentSubtotal;
                });
}

// Exercise 5
function applyPromotionsSubtotals() {
    cartList.map( product => {})
}

// Exercise 6
// [David] Removed because refactor

// Exercise 7
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    cart.map( (product, index) => {
        if (product.name === 'Ecologic eggs' && product.quantity > 2) {
            cart[index].subtotalWithDiscount = cart[index].quantity * 2.5;
        } else if (product.name === 'Butter' && cart[index].quantity > 9) {
            cart[index].subtotalWithDiscount = cart[index].quantity * (cart[index].price * 0.66);
        } else {
            cart[index].subtotalWithDiscount = cart[index].quantity * cart[index].price;
        }
    })
}

// Exercise 8
function addToCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // Note: no needed loop. Function is getting an index of the product in the array 
    // so we can use it directly to select the desired product
    const productSelected = products[id - 1];
    // 2. Add found product to the cartList array
    // Refactor to apply logic of cart in each element added

    let currentProductNames = cart.map( product => product.name );
    if (currentProductNames.includes(productSelected.name)) {
        // There are at least one product of the same type. We must find the index in the array and update it.
        const productIndex = cart.findIndex( cartProduct => cartProduct.name === productSelected.name);
        cart[productIndex] = {
            ...cart[productIndex],
            quantity: cart[productIndex].quantity + 1,
            subtotal: cart[productIndex].subtotal + cart[productIndex].price
            }

    } else { // Product is the first of it's type
        cart.push({
            ...productSelected,
            quantity: 1,
            subtotal: productSelected.price
            });
    
    }

    // Adding to cartList because other funcions depends on that object it's updated
    addToCartList(id);

    // Updating subtotals with new product added
    calculateSubtotals();

    // Checking if promotions should be applied
    applyPromotionsCart();

    // Updating total amount
    calculateTotal();
}

// Exercise 9
function removeFromCart(name) {

    const indexProductInCart = cart.findIndex( cartProduct => cartProduct.name === name);
    // If we have only one product of this type in the cart we remove the object in the array
    if (cart[indexProductInCart].quantity === 1) {
        cart.splice(indexProductInCart, 1);
    } else { // If we have more than one, we must reduce in 1 the quantity
        cart[indexProductInCart] = {
            ...cart[indexProductInCart],
            quantity: cart[indexProductInCart].quantity  - 1,
            subtotal: cart[indexProductInCart].subtotal - cart[indexProductInCart].price
        }
        // And we must calculate subtotalWithDisccount again because removing quantity could change the rules
        applyPromotionsCart();
    }

    // Updating total cart after remove item
    calculateTotal();
    // Refreshing cart print
    printCart();
}



// Exercise 10
function printCart() {
    let cartModal = document.querySelector('#cartModal');
    let listProducts = cartModal.querySelector('.list');
    // Cleaning previous list to refresh
    listProducts.innerHTML = ''
    // Fill the shopping cart modal manipulating the shopping cart dom
    cart.map(product => {
        let newProduct = document.createElement('li');
        // Adding icon to remove a unit of product
        newProduct.innerHTML = `<i class="fas fa-minus-square" onclick="removeFromCart('${product.name}')"></i>`;
        // Showing number of product in cart
        newProduct.innerHTML += `<span class="cart-quantity">${product.quantity}</span>`
        // Adding name of the product
        newProduct.innerHTML += `<span>${product.name}</span>`
        // Adding prices. If product has disccount we show subtotals
        if (product.subtotal !== product.subtotalWithDiscount) {
            newProduct.innerHTML += `
                <div>
                    <span class="original-subtotal">
                        ${product.subtotal}$
                    </span>
                    <span>
                        ${product.subtotalWithDiscount}$
                    </span>
                </div>`
        } else {
            newProduct.innerHTML += `<div>${product.subtotal}$</div>`
        }
        //`x${product.quantity} - ${product.name} (${product.subtotalWithDiscount})`;
        
        
        listProducts.appendChild(newProduct);
    })

    // Setting total amount
    let totalAmount = document.querySelector('#totalCartAmount');
    totalAmount.innerHTML = total + '$'; 
}