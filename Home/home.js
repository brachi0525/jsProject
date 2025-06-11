const arr = ["./img/אייס-קצפת-בינוני-1024x1024.jpg",
    "./img/גלידה-אמריקאית-משובחת-1024x1024.jpg", "./img/וופל-בלגי-1024x1024.jpg", "./img/יוגורט-טבעי-1024x1024.jpg"];

const next = document.getElementById('next');
const previous = document.getElementById('previous');
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const img3 = document.getElementById('img3');

let currentIndex = 0;

const updateImages = () => {
    img1.src = arr[currentIndex];
    img2.src = arr[(currentIndex + 1) % arr.length];
    img3.src = arr[(currentIndex + 2) % arr.length];
}

next.onclick = () => {
    currentIndex = (currentIndex + 1) % arr.length; // מעגלים חזרה
    updateImages();
};

previous.onclick = () => {
    currentIndex = (currentIndex - 1 + arr.length) % arr.length; // מעגלים חזרה
    updateImages();
};

updateImages();



const AboutUs=document.getElementById('AboutUs');
AboutUs.innerHTML=`   <div id="About_us_left">
<h1>ABOUT US</h1>
<p>גלידריית קצפת, הגלידה הירושלמית המצליחה מזה 33 שנה
    , מציגה חוויית ״לונה פארק של טעמים״. <br><br>
    בתפריט המגוון שלנו, תוכל למצוא גלידות איכותיות
    , וופל בלגי, פרוזן יוגורט, קרפ צרפתי, יוגורטים <br>
    ייחודיים, מילקשייקים
    , שייק פירות, אייסים מפנקים ושתייה חמה. <br><br>
    אנו שמחים להציע את הקצפת המיוחדת
    של קצפת חינם על רוב המוצרים שלנו! <br><br>
    *כשרות הרשת: כשר למהדרין <br>
    כל המוצרים נמצאים בהשגחת
    הרב רובין ובד״ץ העדה החרדית ירושלים. <br><br>
    הצטרפו אלינו לחוויה מתוקה ומפנקת!</p>
</div>
<div id="About_us_right">
<div id="img1About">
    <img src="/Home/img/גלדיות לדף הבית.png" alt="">
</div>
<div id="img2About">
    <img src="/Home/img/גלידות לדף הבית.png" alt="">
</div>
<div id="img3About">
    <img src="/Home/img/גלידות לדף הבית3.png" alt="">
</div>
</div>`


const timer = document.getElementById('contTimer')
const countdown = (minutes) => {
    let totalSeconds = minutes * 60;
    const countdownTimer = setInterval(() => {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds - minutes * 60;
        minutes.id = "minutes";

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        timer.innerHTML = minutes + ":" + seconds;

        if (totalSeconds === 0) clearInterval(countdownTimer);
        else totalSeconds--;
    }, 1000);
}


countdown(20);






const popupStart = document.getElementById('popupStart');
const tz = document.getElementById('tz');
const overlay = document.getElementById('overlay');
const conected = document.getElementById('conected')

setTimeout(() => {
    if (!sessionStorage.getItem('popupDisplayed')) {
        popupStart.style.display = 'block'

        overlay.style.display = 'block';
        document.body.style.overflow = ''; 

        sessionStorage.setItem('popupDisplayed', 'true'); 
    }


}, 3000);

conected.onclick = () => {
    setPopup(tz.value)
}
function setPopup(userId) {
    let userExists = false;
    if (Array.isArray(Users)) {
        Users.forEach(element => {
            if (element.TZ == userId) {
                userExists = true;  
                currentUser = element.id
                sessionStorage.setItem('currentuser', JSON.stringify(currentUser))
                window.location.href = '/Home/home.html'; 
            }
        });

        if (!userExists) {
            window.location.href = '/Start/Start.html'; 
        }
    }
    else
        window.location.href = '/Start/Start.html'; 

}


