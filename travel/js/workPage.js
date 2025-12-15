//Открытие номеров
/*
const item__button = document.querySelectorAll('.item__button');
const menu__ul = document.querySelectorAll('.menu__ul');
function toggleDropdown(index) {
  menu__ul[index].classList.toggle('show');
}
item__button.forEach((item__button, index) => {
  item__button.addEventListener('click', () => {
    toggleDropdown(index);
  });
});
*/

console.log(localStorage);
const requestMessage = "Заявка отправлена, ждите подтверждения от администрации отеля";

const dataArray = localStorage.getItem('Hotel:');
const ArrayRoom = localStorage.getItem('Room:');
const ArrayBooking = localStorage.getItem('Booking:');

if (!dataArray || !ArrayRoom) {
    console.error("Данные не найдены в localStorage.");
} else {
    const ss = JSON.parse(dataArray);
    const rr = JSON.parse(ArrayRoom);
    const bb = ArrayBooking ? JSON.parse(ArrayBooking):[];

    const hotelList = document.querySelector('.listOfHotels');

    for (let i = 0; i < ss.length; ++i) {
        const name = ss[i].name;

        const descr = ss[i].description;

        const hotelItem = document.createElement('li');
        hotelItem.className = 'li';

        const itemWrapper = document.createElement('div');
        itemWrapper.className = 'ItemWrapper';

        const hotelName = document.createElement('h1');
        hotelName.className = 'item__h';
        hotelName.textContent = name;

        const hotelDescription = document.createElement('p');
        hotelDescription.className = 'item__p';
        hotelDescription.textContent = descr;

        const button = document.createElement('button');
        button.className = 'item__button';
        button.textContent = 'Номера';

        const menu = document.createElement('ul');
        menu.className = 'menu__ul';

        for (let j = 0; j < rr.length; ++j) {
            const nameHotel = rr[j].hotel;
            if (name === nameHotel) {
                const nameRoom = rr[j].name;
                const descrRoom = rr[j].description;

                const roomItem = document.createElement('li');
                roomItem.className = 'menu__ul__el';

                const roomName = document.createElement('h1');
                roomName.className = 'menu__h';
                roomName.textContent = nameRoom;

                const roomDescription = document.createElement('p');
                roomDescription.className = 'menu__p';
                roomDescription.textContent = descrRoom;

                const roomButton = document.createElement('button');
                roomButton.className = 'menu__button';
                roomButton.textContent = 'Забронировать';
                roomButton.onclick = function(){
                  openBooking(name, nameRoom);
                }

                const statusDiv = document.createElement('div');
                statusDiv.className = 'status__el';

                const statusText = document.createElement('p');
                statusText.textContent = "Свободно";
                statusText.className = 'status__p';

                const statusIndicator = document.createElement('div');

                let isBooked = false;

                for (let g = 0; g < bb.length; ++g) {
                    if (bb[g].hotel === name  && bb[g].room === nameRoom) {
                        if (bb[g].booking === 'Забронировано') {
                            statusText.textContent = 'Забронировано';
                            statusIndicator.className = 'status__ind2';
                            isBooked = true; 
                            break; 
                        }

                        if (bb[g].booking === 'Куплено') {
                          statusText.textContent = `Куплено. Период: ${bb[g].checkin}  ---  ${bb[g].checkout}`;
                          statusIndicator.className = 'status__ind3';
                          isBooked = true; 
                          break; 
                      }

                      if (bb[g].booking === requestMessage) {
                          statusText.textContent = requestMessage;
                          statusIndicator.className = 'status__ind4';
                          isBooked = true; 
                          break; 
                      }

                      if (bb[g].booking === "Одобрено, ожидание оплаты") {
                          statusText.textContent = "Одобрено, ожидание оплаты";
                          statusIndicator.className = 'status__ind4';
                          isBooked = true; 
                          break; 
                      }

                    }
                }
                    
                if (!isBooked) {
                    statusText.textContent = 'Свободно';
                    statusText.className = 'status__p';
                    statusIndicator.className = 'status__ind1';
                }

                statusDiv.appendChild(statusText);
                statusDiv.appendChild(statusIndicator);

                roomItem.appendChild(roomName);
                roomItem.appendChild(roomDescription);
                roomItem.appendChild(roomButton);
                roomItem.appendChild(statusDiv);

                menu.appendChild(roomItem);
            }
        }

        button.onclick = function () {
          menu.classList.toggle('show');
      };

      itemWrapper.appendChild(hotelName);
      itemWrapper.appendChild(hotelDescription);
      itemWrapper.appendChild(button);
      hotelItem.appendChild(itemWrapper);
      hotelItem.appendChild(menu);
      hotelList.appendChild(hotelItem);
  }
}

function closeBooking() {
    document.querySelector(".booking").classList.remove("show");
    document.querySelector(".MAIN__wrap").classList.remove('blur');
    document.getElementById("overlay").classList.remove("show");
}

//Открытие бронирования
function openBooking(nameHotel, nameRoom) {
    document.querySelector(".booking").classList.add("show"); 
    document.querySelector(".MAIN__wrap").classList.add('blur');
    document.getElementById("overlay").classList.add("show");

    // Сброс дат при открытии
    document.getElementById('checkin-date').value = '';
    document.getElementById('checkout-date').value = '';

    const bookedDates = getBookedDates(nameHotel, nameRoom);
    console.log(bookedDates);
    
    // Блокируем занятые даты
    setupDatePickerWithBlockedDates(bookedDates);

    const bookingInfo = document.querySelector('.confirm');
    bookingInfo.onclick = function(){
      confirmBooking(nameHotel, nameRoom);
    }
}


function getBookedDates(nameHotel, nameRoom) {
    const arrBooking = localStorage.getItem('Booking:');
    if (!arrBooking) return [];
    
    const BB = JSON.parse(arrBooking);
    const bookedDates = [];
    
    for (let i = 0; i < BB.length; i++) {
        if (BB[i].hotel === nameHotel && BB[i].room === nameRoom) {
            bookedDates.push({
                checkin: BB[i].checkin,
                checkout: BB[i].checkout
            });
        }
    }
    return bookedDates;
}

// Функция для блокировки занятых дат через
function setupDatePickerWithBlockedDates(bookedDates) {
    // Преобразуем занятые периоды в массив заблокированных дат
    const disabledDates = [];
    
    bookedDates.forEach(period => {
        // Блокируем весь период от checkin до checkout
        const start = new Date(period.checkin);
        const end = new Date(period.checkout);
        
        // Добавляем все даты в периоде в массив заблокированных
        const currentDate = new Date(start);
        while (currentDate <= end) {
            disabledDates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });

    console.log('Заблокированные даты:', disabledDates);


    flatpickr("#checkin-date", {
        dateFormat: "Y-m-d",
        minDate: "today",
        locale: "ru",
        disable: disabledDates,
        onChange: function(selectedDates, dateStr, instance) {
            // При выборе даты заезда обновляем дату выезда
            if (selectedDates[0]) {
                checkoutFP.set('minDate', selectedDates[0]);
            }
        }
    });


    const checkoutFP = flatpickr("#checkout-date", {
        dateFormat: "Y-m-d",
        minDate: "today",
        locale: "ru",
        disable: disabledDates,
    });
}

function confirmBooking(nameHotel, nameRoom) {
    const checkinDate = document.getElementById('checkin-date').value;
    const checkoutDate = document.getElementById('checkout-date').value;
    
    // Проверка заполнения дат
    if (!checkinDate || !checkoutDate) {
        alert('Пожалуйста, выберите даты заезда и выезда');
        return;
    }
    
    // Проверка что дата выезда после даты заезда
    if (checkoutDate < checkinDate) {
        alert('Дата выезда должна быть после даты заезда');
        return;
    }

    document.querySelector(".booking").classList.remove("show");
    document.querySelector(".MAIN__wrap").classList.remove('blur');
    document.getElementById("overlay").classList.remove("show");

    const arrBooking = localStorage.getItem('Booking:');
    let BB = arrBooking ? JSON.parse(arrBooking) : [];
    let pp = JSON.parse(user);

    let flag = true;
    for (let i = 0; i < BB.length; ++i){
      if (BB[i].hotel === nameHotel && BB[i].room === nameRoom){
        flag = false;
        alert('Вы уже отправили заявку на бронь, либо отель уже забронирован!');
        return;
      }
    }
    if (flag){
        BB.push({ 
            hotel: nameHotel, 
            room: nameRoom, 
            person: pp.login, 
            booking: requestMessage, 
            status: 'Ожидает подтверждения', 
            checkin: checkinDate,
            checkout: checkoutDate
        });
        localStorage.setItem('Booking:', JSON.stringify(BB));

        alert('Бронь отправлена!');
        location.reload();
    }
}

//Roole
const admin = sessionStorage.getItem("admin");
const user = sessionStorage.getItem("user");
const adminH = sessionStorage.getItem("admin:");

if (admin) {
    console.log("Admin found:", admin);
    document.querySelectorAll(".menu__button").forEach(function(button) {
        button.classList.add("hide");
    });
    document.querySelector(".pref2").classList.add("show");
} else if (user) {
    console.log("User found:", user);
    document.querySelector(".pref1").classList.add("show");
    document.querySelector(".pref2").classList.add("hide");
} else if (adminH){
    console.log("Admin is Hotel found:", adminH);
    document.querySelectorAll(".menu__button").forEach(function(button) {
      button.classList.add("hide");
    });
    document.querySelector(".pref3").classList.add("show");
    document.querySelector(".pref2").classList.add("hide");
} else{
    console.error("Neither user nor admin exists.");
}

//EXIT
document.getElementById("exit__button").addEventListener("click", function() {
  sessionStorage.removeItem("user"); 
  sessionStorage.removeItem("admin"); 
  sessionStorage.removeItem("adminH");
});