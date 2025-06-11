const containerFinish = document.getElementById('containerFinish')
const totalPrice = sessionStorage.getItem('totalPrice')
containerFinish.innerHTML = ` <h1>סיום ותשלום</h1>
<h3 style="font-size: 20px;">סה"כ לתשלום:${totalPrice}</h3>

<form>
    <h2>פרטי לקוח</h2>
    <label for="name">שם מלא:</label>
    <input type="text" id="name" name="name" required  placeholder=" ">

    <label for="email">דואר אלקטרוני:</label>
    <input type="email" id="email" name="email" required>

    <label for="address">כתובת:</label>
    <input type="text" id="address" name="address" required>

    <h2>פרטי תשלום</h2>
    <label for="card-number">מספר כרטיס אשראי:</label>
    <input type="text" id="card-number" name="card-number" required>

    <label for="expiry-date">תאריך תפוגה:</label>
    <input type="text" id="expiry-date" name="expiry-date" placeholder="MM/YY" required>

    <label for="cvv">CVV:</label>
    <input type="text" id="cvv" name="cvv" required>

    <button  id="buttonFinish">שלח תשלום</button>
</form>`
const HowTake = document.getElementById('HowTake');
const mishloach = document.getElementById('mishloach');
const self = document.getElementById('self')
const seet = document.getElementById('seet')
const submitButton = document.getElementById('buttonFinish');
const showDateles = document.getElementById('showDateles');

mishloach.onchange = () => {
    pass()
    sessionStorage.setItem('checkBox', 'משלוח')
}
self.onchange = () => {
    pass()
    sessionStorage.setItem('checkBox', 'איסוף עצמי')
}
seet.onchange = () => {
    pass()
    sessionStorage.setItem('checkBox', 'ישיבה במקום')

}
function pass() {

    setTimeout((minutes) => {
        HowTake.style.display = 'none'
        containerFinish.style.display = 'block'
    }, 1000);


}


submitButton.onclick = (e) => {
    e.preventDefault(); 

    let productsDatales = document.createElement('p');
    productsDatales = '';
    Users.forEach(user => {
        if (user.id == currentUser) {
            user.bag.forEach((element) => {
                const { name } = store.products[element.code - 1];

                const amoumt = element.amoumt
                productsDatales += `  ${name} <br>רטבים:${element.sauces} <br>תוספות:${element.toppings}  <br>כמות:${amoumt} <br><br>  `;

            });
        }
    });
 
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const checkBox = sessionStorage.getItem('checkBox')

    const div = document.createElement('div')
    div.id = 'showDatelesContetnt'
    div.innerHTML = `
    <h1>ההזמנה בדרך אליכם:)</h1>
    <p><strong> אופן קבלת ההזמנה:</strong> ${checkBox}</p>
    <h3 style="font-size: 20px;">סה"כ שולם:${totalPrice}</h3>

   <h2>פרטי המזמין</h2>

    <p><strong>שם המזמין:</strong> ${name}</p>
    <p><strong>דואר אלקטרוני:</strong> ${email}</p>
    <p><strong>לכתובת:</strong> ${address}</p>
    <p><strong>שולם מכרטיס אשראי:</strong> ${cardNumber}</p>
    <p><strong>תאריך תפוגה:</strong> ${expiryDate}</p>
   
    <h2>פרטי ההזמנה</h2>
   ${productsDatales}
    `;
    showDateles.appendChild(div);
    containerFinish.style.display = 'none';
    showDateles.style.display = "block"; 
    deleteProductsAfterPaid()
}



function deleteProductsAfterPaid () {

    setTimeout((minutes) => {
        Users.forEach(user => {
            if (user.id == currentUser) {
               user.bag.splice(0, user.bag.length);
            }
        });
      
        localStorage.setItem('Users', JSON.stringify(Users));

        window.location='/Home/home.html'

    }, 20000);


}


const Footerr = document.getElementById('Footer')
Footer.removeAttribute('id');
Footer.innerHTML = null