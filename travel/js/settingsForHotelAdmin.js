console.log(localStorage);
const dataArray = localStorage.getItem('Hotel:');
const ArrayRoom = localStorage.getItem('Room:');
const arrBooking = localStorage.getItem('Booking:');

if (!dataArray || !ArrayRoom || !arrBooking) {
    console.error("Данные не найдены в localStorage.");
} else {
    const ss = JSON.parse(dataArray);
    const rr = JSON.parse(ArrayRoom);
    const bb = JSON.parse(arrBooking);

    const aa = sessionStorage.getItem("admin:");
    let a = JSON.parse(aa);

    // Находим отель, которым управляет текущий администратор
    const adminHotel = ss.find(hotel => hotel.name === a.name);
    
    if (!adminHotel) {
        console.error("Отель не найден для данного администратора");
    }

    const bookingItem = document.querySelector('.main__el');

    for (let i = 0; i < bb.length; ++i) {
        const nameHotel = bb[i].hotel;

        // Сравниваем название отеля из бронирования с отелем администратора
        if (adminHotel?.name === nameHotel){
            const nameRoom = bb[i].room;
            const namePerson = bb[i].person;
            const statB = bb[i].status;
            console.log(namePerson);

            const booking__wrap = document.createElement('div');
            booking__wrap.className = 'booking';

            const hotelName = document.createElement('h1');
            hotelName.className = 'booking__HotelName';
            hotelName.textContent = nameHotel;

            const RoomName = document.createElement('h1');
            RoomName.className = 'booking__RoomName';
            RoomName.textContent = nameRoom;

            const buttonConf = document.createElement('button');
            buttonConf.className = 'buy__room menu__button';
            buttonConf.textContent = 'Одобрить';
            buttonConf.onclick = function(){
                confirmBooking(nameHotel, nameRoom);
            }

            const buttonCanc = document.createElement('button');
            buttonCanc.className = 'cancel__booking menu__button';
            buttonCanc.textContent = 'Отклонить';
            buttonCanc.onclick = function(){
                cancerBooking(nameHotel, nameRoom, statB);
            }

            // Добавляем кнопку календаря
            const buttonCalendar = document.createElement('button');
            buttonCalendar.className = 'calendar__button menu__button';
            buttonCalendar.textContent = '📅 Календарь';
            buttonCalendar.onclick = function(){
                showCalendarForRoom(nameHotel, nameRoom);
            }

            const namePers = document.createElement('div');
            namePers.className = 'booking__person';
            namePers.textContent = `Клиент: ${namePerson}`;

            const stat = document.createElement('div');
            stat.className = 'booking__status';
            stat.textContent = `Статус: ${statB}`;

            booking__wrap.appendChild(hotelName);
            booking__wrap.appendChild(RoomName);
            booking__wrap.appendChild(namePers);
            booking__wrap.appendChild(stat);
            booking__wrap.appendChild(buttonConf);
            booking__wrap.appendChild(buttonCanc);
            booking__wrap.appendChild(buttonCalendar);
            bookingItem.appendChild(booking__wrap);
        }
    }   
}

// Функция для показа календаря с занятыми датами
function showCalendarForRoom(nameHotel, nameRoom) {
    const arrBooking = localStorage.getItem('Booking:');
    const BB = JSON.parse(arrBooking);
    
    // Получаем все брони для этого номера
    const roomBookings = BB.filter(booking => 
        booking.hotel === nameHotel && booking.room === nameRoom
    );
    
    // Создаем массив заблокированных дат
    const disabledDates = [];
    
    roomBookings.forEach(booking => {
        if (booking.checkin && booking.checkout) {
            const start = new Date(booking.checkin);
            const end = new Date(booking.checkout);
            const currentDate = new Date(start);
            
            // Добавляем все даты в периоде
            while (currentDate <= end) {
                disabledDates.push(currentDate.toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    });
    
    // Показываем модальное окно
    const modal = document.getElementById('calendarModal');
    const calendarContainer = document.getElementById('calendarContainer');
    
    // Очищаем контейнер
    calendarContainer.innerHTML = '';
    
    // Создаем контейнер для календаря
    const calendarDiv = document.createElement('div');
    calendarDiv.id = 'calendar-display';
    calendarDiv.style.marginBottom = '20px';
    
    // Информация о бронированиях
    const infoDiv = document.createElement('div');
    infoDiv.innerHTML = `
        <h4>Бронирования для "${nameRoom}":</h4>
        <p><strong>Всего броней:</strong> ${roomBookings.length}</p>
        <p><strong>Занятые даты показаны красным цветом</strong></p>
    `;
    calendarContainer.appendChild(infoDiv);
    calendarContainer.appendChild(calendarDiv);
    
    // Список бронирований
    if (roomBookings.length > 0) {
        const listDiv = document.createElement('div');
        listDiv.style.marginTop = '20px';
        listDiv.innerHTML = '<h4>Список бронирований:</h4>';
        
        roomBookings.forEach((booking, index) => {
            const bookingDiv = document.createElement('div');
            bookingDiv.style.padding = '10px';
            bookingDiv.style.margin = '5px 0';
            bookingDiv.style.backgroundColor = '#f5f5f5';
            bookingDiv.style.borderRadius = '5px';
            bookingDiv.innerHTML = `
                <strong>${index + 1}.</strong> ${booking.checkin} - ${booking.checkout}<br>
                <small>Статус: ${booking.status} | Клиент: ${booking.person}</small>
            `;
            listDiv.appendChild(bookingDiv);
        });
        
        calendarContainer.appendChild(listDiv);
    }
    
    // Создаем скрытый input для Flatpickr
    const tempInput = document.createElement('input');
    tempInput.type = 'hidden';
    calendarContainer.appendChild(tempInput);
    
    // Инициализируем Flatpickr
    const calendar = flatpickr(tempInput, {
        inline: true,
        mode: "multiple",
        dateFormat: "Y-m-d",
        locale: "ru",
        disable: disabledDates,
        showMonths: 2,
        appendTo: calendarDiv, // Прикрепляем календарь к нашему контейнеру
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            // Подсвечиваем занятые даты
            if (disabledDates.includes(dayElem.dateObj.toISOString().split('T')[0])) {
                dayElem.style.backgroundColor = "#ff4444";
                dayElem.style.color = "white";
                dayElem.title = "Занято";
            }
        }
    });
    
    // Показываем модальное окно
    modal.style.display = 'block';
    
    // Обработчик закрытия модального окна
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        calendar.destroy(); // Уничтожаем календарь при закрытии
    };
    
    // Закрытие по клику вне модального окна
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            calendar.destroy();
        }
    };
}

function confirmBooking(nameHotel, nameRoom){
    const arrBooking = localStorage.getItem('Booking:');
    let BB = JSON.parse(arrBooking);

    for (let i=0; i<BB.length; ++i){
        console.log(BB[i].hotel, BB[i].room, nameHotel, nameRoom);
        if (BB[i].status === 'Куплено' && BB[i].hotel === nameHotel && BB[i].room === nameRoom){
            console.log('f');
            return;
        }
        if (BB[i].hotel === nameHotel && BB[i].room === nameRoom && BB[i].booking){
            if (BB[i].booking == "Куплено") {
                alert("Ошибка! Уже куплено.");
            } else if(BB[i].booking.includes("Одобрено")) {
                alert("Ошибка! Уже одобрено");
            } else {
            BB[i].status = 'Одобрено';
            BB[i].booking = "Одобрено, ожидание оплаты";
            localStorage.setItem('Booking:', JSON.stringify(BB));
            location.reload();
            }
        }
    }
}

function cancerBooking(nameHotel, nameRoom, statB){
    if (statB.includes("Куплено")){
        alert('Нельзя отменить, потому что уже оплачено!');
        return;
    }
    else{
        const arrBooking = localStorage.getItem('Booking:');
        let BB = JSON.parse(arrBooking);
        const updateBooking = BB.filter(booking => booking.room !== nameRoom || booking.hotel !== nameHotel);
        localStorage.setItem('Booking:', JSON.stringify(updateBooking));
        location.reload();
    }
}