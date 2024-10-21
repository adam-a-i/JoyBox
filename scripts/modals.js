import { addGift } from "./page.js";// exporting a function to addgifts

const modalR = document.querySelector('.modalR');//the modal for reserving
const modalA = document.querySelector('.modalA');//the modal for adding
const closeBtn = document.querySelectorAll('.close'); // close modal
const reserveBtn = document.querySelectorAll('.reserve-button');// circle button to reserve
const reservedYesBtn = document.querySelectorAll('.yes'); //yes button to reserve from modal 
const addGiftButton = document.querySelector('.addGift');//main add gift button
const addGiftButtonModal = document.querySelector('.addGiftModal');//the add gift button in the popup


document.addEventListener('click', e =>{// event delegation for all of the reserving buttons
    console.log(e.target);
    if(e.target.matches('.circle')){
        const button = e.target.parentElement;// because e targets the picutre in the button while we want the button itself
        modalR.showModal();
        reserveCheck(button);//passing the specific button so that we can change it's specific properties
    }
});

function reserveCheck(button){
    console.log('in reserved button');
    reservedYesBtn.forEach(btn => { // detects for click for the yes button in modal
    btn.addEventListener('click', () =>{
        console.log('click detected');
        const img = button.querySelector('.circle');// targets the circle image within the specific button
        img.src = '../images/circleChecked.png';
        modalR.close();
    });});
}


addGiftButtonModal.addEventListener('click', () => {// runs add gift after add button in modal is clicked
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

