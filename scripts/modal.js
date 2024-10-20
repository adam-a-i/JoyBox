const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const openBtn = document.querySelector('.reserve-button');
const reservedBtn = document.querySelector('.yes');

openBtn.addEventListener('click', () => {
    modal.showModal();
});

closeBtn.addEventListener('click', () => {
    modal.close();
});