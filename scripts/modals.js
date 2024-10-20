import { addGift } from "./page.js";// exporting a function to addgifts

const modalR = document.querySelector('.modalR');//the modal for reserving
const modalA = document.querySelector('.modalA');//the modal for adding
const closeBtn = document.querySelectorAll('.close'); // close modal
const openBtn = document.querySelectorAll('.reserve-button');// reserve button
const reservedBtn = document.querySelectorAll('.yes'); //yes button to reserve
const addGiftButton = document.querySelector('.addGift');//main add gift button
const addGiftButtonModal = document.querySelector('.addGiftModal');//the add gift button in the popup



addGiftButtonModal.addEventListener('click', () => {// runs add gift after  add button in modal is clicked
    addGift();
    modalA.close();
});


addGiftButton.addEventListener('click', () => {// shows the modal to input the gift you want to add
    modalA.showModal();
});


openBtn.forEach((btn) => {//still fixing
    btn.addEventListener('click', () => {
        console.log('hi');
        modalR.showModal();
});});

closeBtn.forEach((btn) =>{// used to close modals
    btn.addEventListener('click', () => {
        modalR.close();
        modalA.close();
});});

reservedBtn.forEach((btn) => {//after you oficially reserve the present it changes the status and ticks the gift
    btn.addEventListener('click', () => {
    const img = document.querySelector('.circle');
    img.src = '../images/circleChecked.png';
    modalR.close();
});});