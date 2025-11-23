const login = document.querySelector('#name');
const password = document.querySelector('#password');
const repPassword = document.querySelector('#repeatPassword');
const btn = document.querySelector(".forms__button");
const passwordAdmin = 2314;
btn.onclick = function () {
    sessionStorage.clear();
    const loginVal = login.value;
    const passwordVal = password.value;
    const repPasswordVal = repPassword.value;
    const DBUser = localStorage.getItem("user:" + loginVal);
    
    if (DBUser === null) {
        if (passwordVal == repPasswordVal) {
            const user = JSON.stringify({
                login: loginVal,
                password: passwordVal,
                role: 0
            });
            localStorage.setItem("user:" + loginVal, user);
            alert("Вы зарегестрировались!");
            sessionStorage.setItem("user", user);
            window.location.replace('../html/workPage.html');
        }
        else {
            alert("Пароли должны совпадать!");
        }
    }
    else {
        alert("Пользователь с таким логином уже существует!");
    }
}