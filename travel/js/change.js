//Открытие номеров
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



const dataArray = localStorage.getItem('Hotel:');
const ArrayRoom = localStorage.getItem('Room:');
if (!dataArray || !ArrayRoom) {
    console.error("Данные не найдены в localStorage.");
} 
else {
    const ss = JSON.parse(dataArray);
    const rr = JSON.parse(ArrayRoom);

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

        const btnWrap = document.createElement('div');
        btnWrap.className = 'menu__button__wrap';

        const buttonDel = document.createElement('button');
        buttonDel.className = 'menu__button delete';
        buttonDel.textContent = 'Удалить';
        buttonDel.onclick = function() {
          openDelMenu(name);
        };

        const button = document.createElement('button');
        button.className = 'item__button';
        button.textContent = 'Номера';

        const buttonEdit = document.createElement('button');
        buttonEdit.className = 'menu__button edit';
        buttonEdit.textContent = 'Редактировать';
        buttonEdit.onclick = function(){
          openEditMenu(name, descr, menu);
        };

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



                roomItem.appendChild(roomName);
                roomItem.appendChild(roomDescription);



                menu.appendChild(roomItem);
            }
        }

        button.onclick = function () {
          menu.classList.toggle('show');
      };

      


      itemWrapper.appendChild(hotelName);
      itemWrapper.appendChild(hotelDescription);
      btnWrap.appendChild(buttonDel);
      btnWrap.appendChild(button);
      btnWrap.appendChild(buttonEdit);
      itemWrapper.appendChild(btnWrap);
      hotelItem.appendChild(itemWrapper);
      hotelItem.appendChild(menu);
      hotelList.appendChild(hotelItem);

      function openDelMenu(name) {
        let a = confirm(`Вы действительно хотите удалить "${name}"? Все номера и администратор этого отеля удалятся.`);
        if (a) {
            const dataArray = localStorage.getItem('Hotel:');
            const ArrayRoom = localStorage.getItem('Room:');
            const ArrayAdminH = localStorage.getItem('admin:');
            const ArrayBooking = localStorage.getItem('Booking:');
            
            const ss = JSON.parse(dataArray);
            const rr = JSON.parse(ArrayRoom);
            const hh = JSON.parse(ArrayAdminH);
            const bb = JSON.parse(ArrayBooking);

            const updatedHotels = ss.filter(hotel => hotel.name !== name);
            localStorage.setItem('Hotel:', JSON.stringify(updatedHotels));
    
            const updatedRooms = rr.filter(room => room.hotel !== name);
            localStorage.setItem('Room:', JSON.stringify(updatedRooms));

            const updateAdminH = hh.filter(admin => admin.hotel !== name);
            localStorage.setItem('admin:', JSON.stringify(updateAdminH));

            const updateBooking = bb.filter(booking => booking.hotel !== name);
            localStorage.setItem('Booking:', JSON.stringify(updateBooking));

            alert(`Отель "${name}" удален.`);
            location.reload();
        }
      }

      function openEditMenu(name, descr, menu) {
      
      document.querySelector(".editMenu").classList.toggle("show");
      document.querySelector(".MAIN__wrap").classList.toggle('blur');

      const inputName = document.getElementById('Hotel');
      const inputDescr = document.getElementById('Descr');

      inputName.value = name;
      inputDescr.value = descr;

      const a = inputName.value;

      const item = document.querySelector('.roomList');
      const inputNameR = document.getElementById('Room');
      const inputDescrR = document.getElementById('RoomDescr');
      item.innerHTML = '';
      inputNameR.value ='';
      inputDescrR.value ='';
      const arrRoom = localStorage.getItem('Room:');
      const rr = arrRoom ? JSON.parse(arrRoom) : [];

      let bb;

      for (let i = 0; i < rr.length; ++i) {
          if (rr[i].hotel === name) { 
              const roomItem = document.createElement('li'); 
              roomItem.className = 'room__item'; 
              roomItem.textContent = rr[i].name; 
              roomItem.onclick = function(){
                inputNameR.value = rr[i].name;
                inputDescrR.value = rr[i].description;
                bb = rr[i].name;
              }
              item.appendChild(roomItem);
          }
      }
      

      const btnE = document.getElementById('saveH');
      btnE.onclick = function(){
        saveDataHotel(name);
        
      }

      const btnD = document.getElementById('saveR');
      btnD.onclick = function(){
        saveDataRoom(bb);
      }

      }   
  }
}

function saveDataHotel(name){
  const nameHotel = document.getElementById('Hotel');
  const decscrHotel = document.getElementById('Descr');

  nameHotelVal = nameHotel.value;
  decscrHotelVal = decscrHotel.value;

  const arrHotel = localStorage.getItem('Hotel:');
  const arrRoom = localStorage.getItem('Room:');
  const arrAdmin = localStorage.getItem('admin:');

  hh = JSON.parse(arrHotel);
  rr = JSON.parse(arrRoom);
  ah = JSON.parse(arrAdmin);

  for (let i =0; i<hh.length; ++i){
    if (hh[i].name === name){
      hh[i].name = nameHotelVal;
      hh[i].description = decscrHotelVal;
    }
    if (ah[i].hotel === name){
      ah[i].hotel = nameHotelVal;
    }
  }

  for (let j = 0; j < rr.length; ++j){
    if (rr[j].hotel === name){
      rr[j].hotel = nameHotelVal;
    }
  }
  localStorage.setItem('Room:', JSON.stringify(rr));
  localStorage.setItem('admin:', JSON.stringify(ah));
  localStorage.setItem('Hotel:', JSON.stringify(hh));
  location.reload();
}
function delRoom() {
  const nameRoom = document.getElementById('Room');
  const descrRoom = document.getElementById('RoomDescr');

  const nameRoomVal = nameRoom.value;
  const descrRoomVal = descrRoom.value;

  const existingRoomData = localStorage.getItem('Room:');
  if (!existingRoomData) {
      alert('Нет данных для удаления!');
      return;
  }

  let roomArray = JSON.parse(existingRoomData); 

  const updatedRooms = roomArray.filter(room => room.name !== nameRoomVal);

  if (updatedRooms.length === roomArray.length) {
      alert('Номер не найден для удаления!');
      return; 
  }

  const ArrayBooking = localStorage.getItem('Booking:');
  const bb = JSON.parse(ArrayBooking);
  const updateBooking = bb.filter(booking => booking.room !== nameRoomVal);
  localStorage.setItem('Booking:', JSON.stringify(updateBooking));
  console.log(bb.hotel, nameRoomVal);

  localStorage.setItem('Room:', JSON.stringify(updatedRooms));
  alert('Номер удален!');
  nameRoom.value = '';
  descrRoom.value = '';
  location.reload();
}
function saveDataRoom(nameR) {
  console.log(nameR);
  const nameRoom = document.getElementById('Room');
  const descrRoom = document.getElementById('RoomDescr');
  
  const nameRoomVal = nameRoom.value;
  const descrRoomVal = descrRoom.value;

  const arrRoom = localStorage.getItem('Room:');
  let rr = JSON.parse(arrRoom); 

  let roomUpdated = false;

  for (let j = 0; j < rr.length; ++j) {
      if (rr[j].name === nameR) {
          rr[j].description = descrRoomVal;
          rr[j].name = nameRoomVal;
          roomUpdated = true;
      }
  }

  if (roomUpdated) {
      localStorage.setItem('Room:', JSON.stringify(rr));
      alert('Вы изменили номер!');
      location.reload();
  }
  else {
      alert('Номер не найден для обновления!');
  }
}

console.log(localStorage);