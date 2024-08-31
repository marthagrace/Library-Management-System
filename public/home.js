
let navbar=document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
let searchForm=document.querySelector('.search-form');

document.querySelector('#search-btn').onclick=()=>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
}
let cartItem=document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick=()=>{
    cartItem.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}
window.onscroll=()=>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}
//To add items into Cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cart = document.querySelector('.cart');
console.log(cart);

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const title = this.getAttribute('data-title'); 
        const imgURL = this.getAttribute('data-imgurl'); 
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="fas fa-times"></span>
            <img src="${imgURL}" alt="cart">
            <div class="content">
                <h3>${title}</h3>
            </div>
        `;

        const removeButton = cartItem.querySelector('.fa-times');
        removeButton.addEventListener('click', function() {
            cartItem.remove();
        });

        cart.appendChild(cartItem);
        console.log(cart);
    });
});

//For Search box implementation
    const searchBox = document.getElementById("search-box");
    const productContainer = document.getElementById("product-container");
    
    // Add an input event listener to the search box
    searchBox.addEventListener("input", filterProducts);
    
    function filterProducts() {
        const searchText = searchBox.value.toLowerCase();
        const productBoxes = productContainer.querySelectorAll(".box");
    
        productBoxes.forEach((box) => {
            const title = box.querySelector("h3").textContent.toLowerCase();
            if (title.includes(searchText)) {
                box.style.display = "block"; 
            } else {
                box.style.display = "none"; 
            }
        });
    }
    
    filterProducts();
