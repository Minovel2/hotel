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


    const bookingItem = document.querySelector('.main__el');

    for (let i = 0; i < bb.length; ++i) {
        const nameHotel = bb[i].hotel;

        if (a.hotel === nameHotel){
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

            const namePers = document.createElement('h1');
            namePers.className = 'about';
            namePers.textContent = namePerson;

            const stat = document.createElement('h1');
            stat.className = 'about';
            stat.textContent = statB;

            booking__wrap.appendChild(hotelName);
            booking__wrap.appendChild(RoomName);
            booking__wrap.appendChild(buttonConf);
            booking__wrap.appendChild(buttonCanc);
            booking__wrap.appendChild(namePers);
            booking__wrap.appendChild(stat);
            bookingItem.appendChild(booking__wrap);
        }
    }   
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
        if (BB[i].hotel === nameHotel && BB[i].room === nameRoom){
            BB[i].status = 'Одобрено';
            localStorage.setItem('Booking:', JSON.stringify(BB));
            location.reload();
        }
    }
}

function cancerBooking(nameHotel, nameRoom, statB){
    if (statB === 'Одобрено' || statB === 'Куплено'){
        alert('Нельзя отменить!');
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