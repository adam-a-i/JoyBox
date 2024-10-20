const modalR = document.querySelector('.modalR');
const modalA = document.querySelector('.modalA');
const closeBtn = document.querySelectorAll('.close');
const openBtn = document.querySelector('.reserve-button');
const reservedBtn = document.querySelector('.yes');
const addGiftButton = document.querySelector('.addGift');
const addGiftButtonModal = document.querySelector('.addGiftModal');
addGiftButton.addEventListener('click', () => {
    modalA.showModal();
});



openBtn.addEventListener('click', () => {
    modalR.showModal();
});

closeBtn.forEach((btn) =>{
    btn.addEventListener('click', () => {
        modalR.close();
        modalA.close();
});});

reservedBtn.addEventListener('click', () => {
    const img = document.querySelector('.circle');
    img.src = '../images/circleChecked.png';
    modalR.close();
});