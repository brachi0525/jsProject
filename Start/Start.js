// const UserslocalStorage = localStorage.getItem('Users')
const users = JSON.parse(UserslocalStorage)
const form = document.querySelector('form');
const prevusers = localStorage.getItem('Users');
const Userss = {
    UserDetails: [] 
};
// טען את הנתונים מ-localStorage אם קיימים
if (prevusers) {
    try {
        const parsedUsers = JSON.parse(prevusers);
        
        // בדוק אם המידע שהתקבל הוא מערך
        if (Array.isArray(parsedUsers)) {
            Userss.UserDetails = parsedUsers;
        } else {
            console.warn('המבנה של הנתונים אינו מערך. מאתחלים את Users.UserDetails.');
        }
    }
     catch (error) {
        console.error('שגיאה בפירוק המידע מ-localStorage:', error);
    }
} 
let count=0
if (Array.isArray(users)) {
 count = users.length; 
}

form.onsubmit = (e) => {
    e.preventDefault();
    const currentuser = {
        id: ++count, // 
        userName: document.getElementById('firstName').value,
      
        TZ: document.getElementById('TZ').value ,
        bag: []
    };

    // הוסף את currentuser למערך
    Userss.UserDetails.push(currentuser);
    sessionStorage.setItem('currentuser',count)

    // שמור את המידע החדש ב-localStorage
    localStorage.setItem('Users', JSON.stringify(Userss.UserDetails)); // שים לב כאן

    console.log(Userss.UserDetails); // הצג את המידע הקיים בקונסול

    location.href = "/Home/home.html"; // העבר לעמוד בית
};

