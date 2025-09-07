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
                          statusText.textContent = 'Куплено';
                          statusIndicator.className = 'status__ind3';
                          isBooked = true; 
                          break; 
                      }
                    }
                }
                    
                if (!isBooked) {
                    //console.log(name, nameRoom);
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


//Открытие бронирования
function openBooking(nameHotel, nameRoom) {
    document.querySelector(".booking__wrap").classList.add("show"); 
    document.querySelector(".MAIN__wrap").classList.add('blur'); 

    const bookingInfo = document.querySelector('.confirm');
    bookingInfo.onclick = function(){
      confirmBooking(nameHotel, nameRoom);
    }

    
}

function closeBooking() {
    document.querySelector(".booking__wrap").classList.remove("show");
    document.querySelector(".MAIN__wrap").classList.remove('blur'); 
}

function confirmBooking(nameHotel, nameRoom) {
    document.querySelector(".booking__wrap").classList.remove("show");
    document.querySelector(".MAIN__wrap").classList.remove('blur'); 

    const arrBooking = localStorage.getItem('Booking:');
    let BB = arrBooking ? JSON.parse(arrBooking) : [];
    let pp = JSON.parse(user);

    let flag = true;
    for (let i =0; i<BB.length; ++i){
      if (BB[i].hotel === nameHotel && BB[i].room === nameRoom){
        flag = false;
        alert('Отель уже забронирован!');
        return;
      }
    }
    if (flag){
        BB.push({ hotel: nameHotel, room: nameRoom, person: pp.login, booking: 'Забронировано', status: 'Отправлено'});
        localStorage.setItem('Booking:', JSON.stringify(BB));

        //const stat = document.querySelector('.status__p');
        //stat.textContent = 'Забронировано';
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
    document.querySelector(".pref1").classList.add("show");  // Замена кнопки в зависимости от роли
    document.querySelector(".pref2").classList.add("hide");
} else if (adminH){
    console.log("Admin is Hotel found:", adminH);
    document.querySelectorAll(".menu__button").forEach(function(button) {
      button.classList.add("hide");
    });
    document.querySelector(".pref3").classList.add("show");  // Замена кнопки в зависимости от роли
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