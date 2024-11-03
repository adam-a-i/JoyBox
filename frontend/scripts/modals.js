import { addGift } from "./page.js";// exporting a function to addgifts

const modalR = document.querySelector('.modalR');//the modal for reserving
export const modalA = document.querySelector('.modalA');//the modal for adding
const closeBtns = document.querySelectorAll('.close');
const reserveBtn = document.querySelectorAll('.reserve-button');// circle button to reserve
const reservedYesBtn = document.querySelectorAll('.yes'); //yes button to reserve from modal 
const addGiftButton = document.querySelector('.addGift');//main add gift button
const addGiftButtonModal = document.querySelector('.addGiftModal');//the add gift button in the popup
const modalTextElement = document.querySelector('.modalText'); // modal text element
const originalText = modalTextElement ? modalTextElement.innerHTML : ''; // original modal text content

document.addEventListener('click', e =>{// event delegation for all of the reserving buttons
    if(e.target.matches('.circle')){
        const button = e.target.parentElement;// because e targets the picutre in the button while we want the button itself
        modalR.showModal();
        reserveCheck(button);//passing the specific button so that we can change it's specific properties
    }
});
const modalText = document.querySelector('.modalText').innerHTML; // Cache the modal text element
const yesButton = document.querySelector('.yes'); // Cache the yes button
// WORK ON DISABLING THE RESERVATION TO THE GIFTS WHICH HAVE ALREADY BEEN RESERVED
async function reserveCheck(button){
    console.log('in reserved button');
    reservedYesBtn.forEach(btn => { // detects for click for the yes button in modal
    btn.addEventListener('click', async () =>{
        const giftDiv = button.closest('.gift'); // detects closest gift div to it to return it
        const giftId = giftDiv.getAttribute('data-gift-id');
        const userId = giftDiv.getAttribute('data-user-id');
        const giftStatus = giftDiv.getAttribute('data-gift-status') === 'true';// gets status reservation(take care bc this returns a string first)
        if(!giftStatus){//checks if gift is already reserved(if reserved no re-reservation)
            document.querySelector('.modalText').innerHTML = 'This gift has already been reserved!';
            document.querySelector('.yes').style.display = 'none';
            console.log('this gift is already reserved')
            return;
        }
        try {
            const response = await fetch(`http://localhost:5500/api/gifts/${userId}/${giftId}`, { // PUT call to update status
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ status: false })
            });
            if (!response.ok) throw new Error('Failed to add gift');
        } catch (error) {
            console.error('Error adding gift:', error);
        }
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


closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('close button clicked');
        if (modalR && modalR.open) {
            modalTextElement.innerHTML = originalText; // reset modal text
            reservedYesBtn.forEach((yesBtn) => yesBtn.style.display = 'block'); // reset yes button display
            modalR.close();
        }
        if (modalA && modalA.open) {
            modalA.close();
        }
    });
});