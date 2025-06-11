const allProducts = document.getElementById('allProducts');
const searchForm = document.getElementById('searchForm');
const searchText = document.getElementById('searchText');

const buttons = document.querySelectorAll('#header_Products button');
const pressCategory = document.querySelectorAll('.pressCategory');
// const addProduct = document.getElementById('addProduct')

const displayConfig = {
    searchBy: '',
    sortBy: ''
}

searchForm.onkeyup = (e) => {
    e.preventDefault();
    displayConfig.searchBy = searchForm.searchText.value;
    setProducts();
}

searchForm.onreset = () => {
    displayConfig.searchBy = '';
    setProducts();
}

pressCategory.forEach(button => {
    button.onclick = () => {
        searchText.value='';
        displayConfig.searchBy=''
        displayConfig.sortBy = button.textContent;
        setProducts();
    };
});






const filterProduct = () => {

    if (displayConfig.searchBy === '' && displayConfig.sortBy === '')
        return store.products;

    if (displayConfig.searchBy === '') {
        if (displayConfig.sortBy === '' || displayConfig.sortBy === 'הכול')
            return store.products;
        else
            return store.products.filter((product) => (product.category).trim() == (displayConfig.sortBy).trim());

    }
    else {
        if (displayConfig.sortBy == '' || displayConfig.sortBy === 'הכול')
            return store.products.filter((product) => product.name.includes(displayConfig.searchBy));
        else
            return store.products.filter((product) => ((product.category).trim() == (displayConfig.sortBy).trim()) && product.name.includes(displayConfig.searchBy));


    }
}



const setProducts = () => {
    allProducts.innerHTML = null

    const filteredProduct = filterProduct();
    filteredProduct.forEach(product => {
        const { code, name, price, image, category } = product;
        const div = document.createElement('div');
        div.id = "categorya"
        // div.classList.add('categorya_img');
        div.innerHTML = `<img src="${image}"><div class="product-title">${name}</div><div class="product-price">מחיר: ${price}</div> `
        const btnAdd = document.createElement('button');
        btnAdd.type = 'button';
        btnAdd.innerHTML = 'הוספה לסל';
        btnAdd.id = "btnAddStyle"
        btnAdd.onclick = () => {
         
            sessionStorage.setItem('currentproduct', code)
            window.location = '/ShowProduct/ShowProduct.html'
        }

        div.appendChild(btnAdd);
        allProducts.appendChild(div);

    });

  


}






$.ajax({
    url: '/Data/Products.json',
    success: (data) => {
        store.products = data.products
        const currentUrl = window.location.href;

        const url = new URL(currentUrl);
        const params = url.searchParams;
        const number = params.get("Add another item"); 
       
       
       if (number) {
           updateCart()
        showCartPopup()
           
       }
        setProducts();

    }
})



window.onclick = function (event) {
    const modal = document.getElementById('overlay');
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = '';

    }
}
function showCartPopup() {
    const popup = document.getElementById('cartPopup');
    popup.classList.add('active');


    setTimeout(() => {
        popup.classList.remove('active');
        setTimeout(() => {
            popup.style.display = "none";
        }, 500);
    }, 2000);
}