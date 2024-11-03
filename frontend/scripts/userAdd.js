import { modalA } from "./modals.js";// exporting a function to addgifts
let giftsArray = [];
export async function addGift() {
    const giftText = document.querySelector('.giftInput').value; // gets the gift from the input box
    if(!giftText.trim()){//check if its empty
        let ogText = document.querySelector('.modalText').innerHTML;
        document.querySelector('.modalText').innerHTML = 'Please add a gift';
        document.querySelector('.close').addEventListener('click', () => {
            document.querySelector('.modalText').innerHTML = ogText;
            modalA.close();
        });
        return; 
    }

    const newGift = {giftName: giftText, status: true};// create new gift

    try {
        const response = await fetch(`http://localhost:5500/api/gifts/672523e3ac353793836beb86`, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newGift)
        });
        if (!response.ok) throw new Error('Failed to add gift');
        
        document.querySelector('.giftInput').value = '';
        initGiftDisplay();
    } catch (error) {
        console.error('Error adding gift:', error);
    }
}

async function createJoyBox(){
    const username = document.querySelector('.name');
    try {
        const response = await fetch(`http://localhost:5500/api/gifts`, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(newGift)
        });
        if (!response.ok) throw new Error('Failed to add gift');
        
        document.querySelector('.giftInput').value = '';
        initGiftDisplay();
    } catch (error) {
        console.error('Error adding gift:', error);
    }
}