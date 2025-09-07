const name = document.querySelector('#name');
const description = document.querySelector('#description');

function createHotel() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    if (name.trim() === "" || description.trim() === "") {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const card = document.createElement('div');
    card.classList.add('ItemWrapper');

    // Создаем элементы h3 (заголовок) и p (описание)
    const title = document.createElement('h1');
    title.textContent = name;

    const content = document.createElement('p');
    content.textContent = description;

    // Добавляем заголовок и описание в карточку
    card.appendChild(title);
    card.appendChild(content);

    // Добавляем карточку в контейнер
    const cardsContainer = document.getElementById('#li');
    cardsContainer.appendChild(card);

    //document.getElementById("li").classList.toggle("show");
}