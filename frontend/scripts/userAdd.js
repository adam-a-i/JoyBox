import { modalA } from "./modals.js";// exporting a function to addgifts

document.addEventListener('DOMContentLoaded', () => {
    const createJoyBoxBtn = document.querySelector('.create');

    createJoyBoxBtn.addEventListener('click', () => {
        createJoyBox();
    });
});


let gifts = [];
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
    dispAddedGifts(newGift);
    gifts.push(newGift);//adds gift to array
}

async function createJoyBox(){
    const username = document.querySelector('.name').value;
    if (!username.trim()) {
        console.error('Username is required.');
        return;
    }
    try {
        const response = await fetch(`http://localhost:5500/api/gifts`, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username: username, gifts: gifts})
        });
        if (!response.ok) throw new Error('Failed to add gift');
        
        gifts = [];
    } catch (error) {
        console.error('Error adding gift:', error);
    }
}

function dispAddedGifts(gift){ 
    console.log(gift.giftName);
    let html = 
    `   <div class="gift">
            <button class="reserve-button"><img src="../images/circle.png" class="circle"></button>
            <p class="gift-text">${gift.giftName}</p>     
        </div>
        `;

    const container = document.querySelector(".gift-container");
    container.innerHTML += html; //append to containier
}