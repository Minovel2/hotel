const nameH = document.querySelector('#nameHotel');
const description = document.querySelector('#descrHotel');
const login = document.querySelector('#name');
const password = document.querySelector('#password');
const btn = document.querySelector(".forms__button");

btn.onclick = function () {
    const nameVal = nameH.value;
    const descrVal = description.value;
    const loginVal = login.value;
    const passwordVal = password.value;

    // Исправлено условие проверки на пустые поля
    if (!nameVal.trim() || !descrVal.trim() || !loginVal.trim() || !passwordVal.trim()) {
        alert("Заполните все поля!");
        return; // Выход из функции
    }

    // Проверка существующих отелей
    const existingData = localStorage.getItem('Hotel:');
    let dataArray = existingData ? JSON.parse(existingData) : [];
    let flag = true;

    for (let i = 0; i < dataArray.length; ++i) {
        const name = dataArray[i].name;
        if (name === nameVal) {
            flag = false;
            alert('Такой отель уже существует!');
            break; // Выход из цикла
        }
    }

    if (flag) {
        // Проверка существующих администраторов
        const existingAdminData = localStorage.getItem("admin:");
        let adminH = existingAdminData ? JSON.parse(existingAdminData) : [];
        flag = true;

        for (let j = 0; j < adminH.length; ++j) {
            const adminName = adminH[j].name;
            if (loginVal === adminName) {
                flag = false;
                alert('Такой администратор уже существует!');
                break; // Выход из цикла
            }
        }

        if (flag) {
            // Сохранение нового отеля
            dataArray.push({ name: nameVal, description: descrVal, adminH: loginVal, password: passwordVal});
            localStorage.setItem('Hotel:', JSON.stringify(dataArray));

            // Сохранение нового администратора
            adminH.push({ name: loginVal, password: passwordVal, hotel: nameVal, role: 2 });
            localStorage.setItem('admin:', JSON.stringify(adminH));

            alert("Вы создали отель!");
        } else {
            alert("Пользователь с таким логином уже существует!");
        }
    }
};

console.log(localStorage);