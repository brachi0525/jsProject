
const containerChoosed = document.getElementById('containerChoosed');

const currentproduct = JSON.parse(sessionStorage.getItem('currentproduct'));
const wantproduct = document.getElementById('wantimg');
const setProductss = () => {
    store.products.forEach(element => {
        if (element.code == currentproduct) {
            const image = document.createElement('img');
            image.id = "image";
            image.src = element.image;
            wantproduct.appendChild(image);
            const typeproduct = document.createElement('h2');
            typeproduct.id = "typeproduct";
            let text = document.createElement('h1')
            if (element.category == "Ice Cream גלידות") {
                text.innerHTML = 'גלידה 1.2 קילו'
            }
            if (element.category == "Iced Drinks אייסים") {
                text.innerHTML = 'אייס גדול'
            }
            if (element.category == "Hot Desserts קינוחים חמים") {
                text.innerHTML = 'קינוחים חמים על המגש '
            }
            if (element.category == "Hot Drinks שתייה חמה") {
                text.innerHTML = 'שתייה חמה'
            }
            typeproduct.innerHTML = element.name;
            wantproduct.appendChild(text)
            wantproduct.appendChild(typeproduct);
        }
    });
    const existingProductt = Users[currentUser.trim() - 1].bag.find(item => item.code == currentproduct);
    if (existingProductt) {
        existingProductt.amoumt += 1;
        Swal.fire({
            title: "המוצר כבר קיים בעגלה",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "בחירת פריט זהה עם שינויים",
            denyButtonText: `חזרה לעמוד המוצרים`

        }).then((result) => {
            if (result.isConfirmed) {
            } else if (result.isDenied) {
                window.location = '/Prouducts/Prouducts.html'
            }
        });
    }
}


$.ajax({
    url: '/Data/Products.json',
    success: (data) => {
        store.products = data.products
        setProductss();

    }
})
const buttonBackToShop = document.querySelector('.buttonBackToShop');
buttonBackToShop.onclick = () => {

    window.location = '/Prouducts/Prouducts.html'

}

const sauceCheckboxes = document.querySelectorAll('.sauce');
const toppingCheckboxes = document.querySelectorAll('.topping');

function limitCheckboxes(checkboxes, limit) {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
            if (checkedCheckboxes.length > limit) {
                checkbox.checked = false;
                Swal.fire({
                    title: "אנה בחר עד 2 אפשרויות",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });
            }
        });
    });
}

limitCheckboxes(sauceCheckboxes, 2);
limitCheckboxes(toppingCheckboxes, 2);



const confirmFlavorsButton = document.getElementById('confirmFlavorsButton')
confirmFlavorsButton.onclick = () => {
    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "הטעמים נבחרו בהצלחה!",
        showConfirmButton: false,
        timer: 1500
    });


}



document.getElementById('confirmFlavorsButton2').onclick = () => {


    const sauces = document.querySelectorAll('.sauce:checked');
    const selectedSauces = Array.from(sauces).map(sauce => sauce.value);

    const toppings = document.querySelectorAll('.topping:checked');
    const selectedToppings = Array.from(toppings).map(topping => topping.value);

    const cupOption = document.querySelector('input[name="cupOption"]:checked').value;

    const gaviaOption = document.querySelector('input[name="gaviaOption"]:checked').value;

    const currentBag = {
        "code": `${currentproduct}`,
        "amoumt": 1,
        "sauces": `${selectedSauces}`,
        "toppings": `${selectedToppings}`,
        "cupOption": `${cupOption}`,
        "gaviaOption": `${gaviaOption}`
    }


    if (currentBag.sauces == '')
    currentBag.sauces = ' ללא רטבים'
    if (currentBag.toppings == '')
    currentBag.toppings = ' ללא תוספות'

    Users[currentUser - 1].bag.push(currentBag)

    localStorage.setItem('Users', JSON.stringify(Users))
    window.location = '/Prouducts/Prouducts.html?Add another item=1'


};


