const nameHotel = document.querySelector('#nameHotel');
const nameRoom = document.querySelector('#name');
const descr = document.querySelector('#descr');
const btn = document.querySelector('.forms__button');
const hotelList = document.getElementById('hotelList');


const existingData = localStorage.getItem('Hotel:');
let dataArray = existingData ? JSON.parse(existingData) : [];

for (let i = 0; i < dataArray.length; ++i) {
    const nameHotel = dataArray[i].name;
    const option = document.createElement('option');
    option.value = nameHotel; 
    hotelList.appendChild(option); 
}


btn.onclick = function() {
    const nameHotelVal = nameHotel.value;
    const nameRoomVal = nameRoom.value;
    const descrVal = descr.value;


    if (!nameHotelVal.trim() || !nameRoomVal.trim() || !descrVal.trim()) {
        alert('Заполните все поля!');
        return; 
    }

    const existingRoomData = localStorage.getItem('Room:');
    let roomArray = existingRoomData ? JSON.parse(existingRoomData) : [];
    
    let hotelExists = false;
    for (let i = 0; i < dataArray.length; ++i) {
        const hotelName = dataArray[i].name;
        if (hotelName === nameHotelVal) {
            hotelExists = true; 
            break;
        }
    }

    if (hotelExists) {
        
        let roomExists = false;
        for (let j = 0; j < roomArray.length; ++j) {
            const roomName = roomArray[j].name;
            const roomHotel = roomArray[j].hotel;
            if (roomName === nameRoomVal && roomHotel === nameHotelVal) {
                roomExists = true;
                alert('Номер с таким названием уже существует!');
                return; 
            }
        }


        roomArray.push({ name: nameRoomVal, description: descrVal, hotel: nameHotelVal, booking: 'Свободно'});
        localStorage.setItem('Room:', JSON.stringify(roomArray));
        alert('Вы создали номер!');
    } else {
        alert('Отель не существует!');
    }
};

console.log(localStorage);