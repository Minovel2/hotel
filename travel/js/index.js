const login = document.querySelector('#name');
const password = document.querySelector('#password');
const btn = document.querySelector(".forms__button");

btn.onclick = function () {
    const loginVal = login.value;
    const passwordVal = password.value;
    const DBUser = localStorage.getItem("user:" + loginVal);
    const DBAdmin = localStorage.getItem("admin:" + loginVal);
    const DBAdminH = localStorage.getItem('admin:');
    const ah = JSON.parse(DBAdminH);
    if (DBUser !== null) {
        const user = JSON.parse(DBUser);
        if (passwordVal == user.password) {
            alert("Вы вошли как пользователь!");
            sessionStorage.setItem("user", DBUser);
            window.location.replace('../html/workPage.html');
            return;
        }
    }
    if (DBAdmin !== null) {
        const admin = JSON.parse(DBAdmin);
        if (passwordVal == admin.password) {
            alert("Вы вошли как администратор!");
            sessionStorage.setItem("admin", DBAdmin);
            window.location.replace('../html/workPage.html');
            return;
        }
    }
    
    for (let i = 0; i<ah?.length; ++i){
        if (loginVal === ah[i].name && passwordVal === ah[i].password){
            const na = {
                name: ah[i].name,
                password: ah[i].password,
                hotel: ah[i].hotel,
                role: ah[i].role
            }
            sessionStorage.setItem('admin:', JSON.stringify(na));
            window.location.replace('../html/workPage.html');
            alert("Вы вошли как администратор гостиницы!");
            return;
        }
    }
    alert("Неверный логин или пароль!");
}

console.log(localStorage);