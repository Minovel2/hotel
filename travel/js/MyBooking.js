const dataArray = localStorage.getItem('Hotel:');
const ArrayRoom = localStorage.getItem('Room:');
const arrBooking = localStorage.getItem('Booking:');

if (!dataArray || !ArrayRoom || !arrBooking) {
    console.error("Данные не найдены в localStorage.");
} else {
    const ss = JSON.parse(dataArray);
    const rr = JSON.parse(ArrayRoom);
    const bb = JSON.parse(arrBooking);

    const aa = sessionStorage.getItem('user');
    let a = JSON.parse(aa);
    console.log(a.login);
    const bookingItem = document.querySelector('.main__el');

    for (let i = 0; i < bb.length; ++i) {
        const pers = bb[i].person;

        if (pers === a.login){
            const nameHotel = bb[i].hotel;
            const nameRoom = bb[i].room;
            const statusForUser = bb[i].status;

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
            buttonConf.textContent = 'Купить';
            buttonConf.onclick = function(){
                buy(nameHotel, nameRoom, statusForUser);
                
            }

            const buttonCanc = document.createElement('button');
            buttonCanc.className = 'cancel__booking menu__button';
            buttonCanc.textContent = 'Отменить бронирование';
            buttonCanc.onclick = function(){
                cancerBooking(nameHotel, nameRoom);
                location.reload();
            }

            const namePers = document.createElement('span');
            namePers.className = 'status';
            namePers.textContent = statusForUser;

            booking__wrap.appendChild(hotelName);
            booking__wrap.appendChild(RoomName);
            booking__wrap.appendChild(buttonConf);
            booking__wrap.appendChild(buttonCanc);
            booking__wrap.appendChild(namePers);
            bookingItem.appendChild(booking__wrap);
        }
    }   
}

function buy(nameHotel, nameRoom, statusForUser){
    if (statusForUser === 'Отправлено'){
        alert('Бронь еще не одобрена!');
        return;
    }
    else{
        alert('Номер куплен!');
        const arrBooking = localStorage.getItem('Booking:');
        let BB = JSON.parse(arrBooking);
        for (let i = 0; i < BB.length; ++i){
            if (BB[i].hotel === nameHotel && BB[i].room === nameRoom && BB[i].status === 'Одобрено') {
                BB[i].status = 'Куплено'; 
                BB[i].booking = 'Куплено';
                console.log(BB[i].hotel, BB[i].room, BB[i].status, nameHotel, nameRoom); 
                localStorage.setItem('Booking:', JSON.stringify(BB));
                location.reload();
            }
        }
    }
}

function cancerBooking(nameHotel, nameRoom){
    const arrBooking = localStorage.getItem('Booking:');
    let BB = JSON.parse(arrBooking);
    const updateBooking = BB.filter(booking => booking.room !== nameRoom || booking.hotel !== nameHotel);
    localStorage.setItem('Booking:', JSON.stringify(updateBooking));
    location.reload();
}

console.log(localStorage);