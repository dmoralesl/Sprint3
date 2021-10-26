// Exercise 11
// Move this variable to a json file and load the data in this js
var products;
fetch('../data/grocery.json')
    .then( response => response.json())
        .then( json => products = json);

var cartList = [];
var cart = [];
var subtotal = {
    grocery: {
        value: 0, 
        discount: 0
    },
    beauty: {
        value: 0, 
        discount: 0
    },
    clothes: {
        value: 0, 
        discount: 0
    },
};
var total = 0;

// Exercise 1
function addToCartList(id) {
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
    console.log(Object.values(subtotal))
    // Calculate total price of the cart either using the "cartList" array
    // [David] Getting values (objects) from subtotals object. Then extracting value (type is not interesting at this point)
    // and reducing value to sum all subtotals to get total amount.
    total = Object.values(subtotal)
        .map(subtotal => subtotal.value)
            .reduce((previousValue, currentSubtotal) => {
                return previousValue + currentSubtotal;
                });
    console.log(total)
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
        if (product.name === 'cooking oil' && product.quantity > 2) {
            cart[index].subtotalWithDiscount = cart[index].quantity * 10;
        } else if (product.name === 'Instant cupcake mixture' && cart[index].quantity > 9) {
            cart[index].subtotalWithDiscount = cart[index].quantity * (cart[index].price * 0.66);
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
            subtotal: cart[productIndex].subtotal + cart[productIndex].price,
            subtotalWithDiscount: cart[productIndex].subtotal + cart[productIndex].price
        }

    } else { // Product is the first of it's type
        cart.push({
            ...productSelected,
            quantity: 1,
            subtotal: productSelected.price,
            subtotalWithDiscount: productSelected.price
        });
    
    }

    // Updating subtotals with new product added
    calculateSubtotals();

    // Updating total amount
    calculateTotal();

    // Checking if promotions should be applied
    applyPromotionsCart();
}

// Exercise 9
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}



// Exercise 10
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
}