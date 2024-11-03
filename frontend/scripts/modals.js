import { addGift } from "./userAdd.js";// exporting a function to addgifts

const modalR = document.querySelector('.modalR');//the modal for reserving
export const modalA = document.querySelector('.modalA');//the modal for adding
const closeBtns = document.querySelectorAll('.close');
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
async function reserveCheck(button) {
    const closeBtn = document.querySelector('.close');
    const modalText = document.querySelector('.modalText');
    const yesButtons = reservedYesBtn; // Assuming this is defined elsewhere
    const originalText = modalText.innerHTML; // Store original text once

    closeBtn.addEventListener('click', () => {
        modalText.innerHTML = originalText; // Always restore original text
        document.querySelector('.yes').style.display = 'block'; // Show yes button again
        modalR.close(); // Close the modal
    });

    console.log('in reserved button');

    yesButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const giftDiv = button.closest('.gift'); 
            const giftId = giftDiv.getAttribute('data-gift-id'); 
            const userId = giftDiv.getAttribute('data-user-id'); 
            const giftStatus = giftDiv.getAttribute('data-gift-status') === 'true'; 

            console.log(giftStatus);

            if (!giftStatus) {
                modalText.innerHTML = 'This gift has already been reserved!'; // Change text for already reserved
                document.querySelector('.yes').style.display = 'none'; // Hide yes button
                console.log('this gift is already reserved');
                return; // Exit early
            }

            try {
                const response = await fetch(`http://localhost:5500/api/gifts/${userId}/${giftId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: false })
                });

                if (!response.ok) throw new Error('Failed to add gift');
            } catch (error) {
                console.error('Error adding gift:', error);
            }

            console.log('click detected');
            const img = button.querySelector('.circle'); 
            img.src = '../images/circleChecked.png'; 

            modalR.close(); // Close the modal after successful reservation
        });
    });
}




addGiftButton.addEventListener('click', () => {// shows the modal to input the gift you want to add
    modalA.showModal();
});



addGiftButtonModal.addEventListener('click', () => {// runs add gift after add button in modal is clicked
    addGift();
    modalA.close();
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