//header
const Header = document.getElementById('Header')

Header.innerHTML = ` <div id="icon">

<button id="basket">סל הקניות</button>

</div>

<a href="/Home/home.html"><img src="/Home/img/LOGO-kasefet.svg" id="logo" alt=""></a>
<button id="burger">≡ MENU</button>
<nav>
<button id="cancelBurger">❌</button>
<a href="/Home/home.html">HOME<br>עמוד הבית</a>
<a href="/Prouducts/Prouducts.html">PROUDUCTS<br>המוצרים שלנו</a>
<a href="" id="CartInHeader">CART<br> הסל שלי</a>
<a href="/Paid/paid.html">PAID<br> מעבר לתשלום</a>
<a href="/Start/Start.html">עדכון פרטים</a>
</nav>`


const burger = document.getElementById('burger')
const nav = document.querySelector('nav')
const cancelBurger = document.getElementById('cancelBurger')
const header = document.getElementById('Header')
const basket = document.getElementById('basket')
const UserslocalStorage = localStorage.getItem('Users')
let currentUser = sessionStorage.getItem('currentuser')
const Users = JSON.parse(UserslocalStorage)
const username = document.getElementById('user_name')
username.innerHTML = Users[currentUser - 1].userName


//סל קניות
const cartElement = document.getElementById('cart');
cartElement.innerHTML = `<div class="cart-heder">
<button id="close-cart" class="close-button">×</button> <!-- כפתור סגירה -->
<h1>סל קניות</h1>
</div>

<div class="cart-content">
<div id="cart-items">
   
</div>
</div>
<div class="cart-footer">
<p>סך הכל: <span id="total-price">0</span> ש"ח</p>
<button id="linkToPaid">מעבר לתשלום</button>
</div>`

const linkToPaid = document.getElementById('linkToPaid')
linkToPaid.onclick = () => {
    location.href = "/Paid/paid.html";

}
const cartItemsElement = document.getElementById('cart-items');
const overlayElement = document.getElementById('overlay');
const totalPriceElement = document.getElementById('total-price');
const closeCart = document.getElementById('close-cart')
const CartInHeader = document.getElementById('CartInHeader')

CartInHeader.onclick = (e) => {
    e.preventDefault();

    nav.classList.remove('burger_press')

    updateCart()

}

basket.onclick = () => {
    updateCart()
}

const store = {
    products: []
}

$.ajax({
    url: '/Data/Products.json',
    success: (data) => {
        store.products = data.products

    }
})

burger.onclick = () => {
    nav.classList.add('burger_press')

}

cancelBurger.onclick = () => {
    nav.classList.remove('burger_press')
}

closeCart.onclick = () => {
    cart.style.display = 'none'
    overlayElement.style.display = 'none';
    document.body.style.overflow = '';

}


const updateCart = () => {
    cartElement.style.display = 'block';

    overlayElement.style.display = 'block';
    document.body.style.overflow = 'hidden';
    cartItemsElement.innerHTML = '';
    let totalPrice = 0;

    Users.forEach(user => {
        if (user.id == currentUser) {
            user.bag.forEach((element, index) => {
                const { code, name, price, image } = store.products[element.code - 1];
                totalPrice += parseInt(price) * element.amoumt;

                const div = document.createElement('div');
                div.id = 'productInShoppingCart';
                div.innerHTML = `<img src="${image}">            
                 <div id="center">
                <h3>${name}</h3>
             
               <span class="price"> מחיר: ${price} </span>
             
                <div id="buttons">
                <button class="increase-quantity" data-index="${index}">+</button>
                <h2 class="quantity" data-index="${index}">${element.amoumt}</h2>
                <button class="decrease-quantity" data-index="${index}">-</button>
                </div>
                </div>

                <button class="remove-item" data-index="${index}">x</button>
                `;
                cartItemsElement.appendChild(div);
            });
        }
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const user = Users.find(u => u.id == currentUser);
            const element = user.bag[index];
            element.amoumt += 1;
            localStorage.setItem('Users', JSON.stringify(Users));

            updateCart();
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const user = Users.find(u => u.id == currentUser);
            const element = user.bag[index];
            if (element.amoumt > 1) {
                element.amoumt -= 1;
            } else {
                user.bag.splice(index, 1);
            }
            localStorage.setItem('Users', JSON.stringify(Users));

            updateCart();
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            const user = Users.find(u => u.id == currentUser);
            user.bag.splice(index, 1);
            localStorage.setItem('Users', JSON.stringify(Users));

            updateCart();
        });
    });

    totalPriceElement.innerText = totalPrice; 
    sessionStorage.setItem('totalPrice', totalPrice)
}





const Footer = document.getElementById('Footer')
Footer.innerHTML = ` <div id="block">
<h2>צור קשר</h2>
<p>02-6253722</p>
<p>ice.cream@gmail.com</p>
</div>
<div id="block">
<h2>ניווט באתר</h2>
<a href="">דף הבית</a><br>
<a href="">מועדון</a><br>
<a href="">הסל שלי</a><br>
<a href="">הסניפים שלנו</a>
</div>
<div id="block">
<h2>קישורים שימושיים</h2>
<a href="">גיפט כארד</a><br>
<a href="">דרושים</a><br>
<a href=""> תקנון</a><br>
<a href="">צור קשר</a>
</div>
`

window.onscroll = function () { stickyHeader() };


var sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("handleScroll");
    } else {
        header.classList.remove("handleScroll");
    }

}
window.onclick = function (event) {
    const modal = document.getElementById('overlay');
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = '';

    }
}


