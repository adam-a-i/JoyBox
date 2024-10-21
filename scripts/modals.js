import { addGift } from "./page.js";// exporting a function to addgifts

const modalR = document.querySelector('.modalR');//the modal for reserving
const modalA = document.querySelector('.modalA');//the modal for adding
const closeBtn = document.querySelectorAll('.close'); // close modal
const openBtn = document.querySelectorAll('.reserve-button');// reserve button
const reservedBtn = document.querySelectorAll('.yes'); //yes button to reserve
const addGiftButton = document.querySelector('.addGift');//main add gift button
const addGiftButtonModal = document.querySelector('.addGiftModal');//the add gift button in the popup

document.addEventListener('click', e =>{// event delegation for all of the reserving buttons
    if(e.target.matches('.circle')){
        modalR.showModal();

        modalR.dataset.selectedGift = selectedGift.innerHTML;
    }
});

addGiftButtonModal.addEventListener('click', () => {// runs add gift after  add button in modal is clicked
    addGift();
    modalA.close();
});


addGiftButton.addEventListener('click', () => {// shows the modal to input the gift you want to add
    modalA.showModal();
});


closeBtn.forEach((btn) =>{// used to close modals
    btn.addEventListener('click', () => {
        modalR.close();
        modalA.close();
});});

reservedBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const img = e.target.closest('.modalR').previousElementSibling.querySelector('.circle');
        img.src = '../images/circleChecked.png';
        modalR.close();
    });
});