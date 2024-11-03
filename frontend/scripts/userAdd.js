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
    document.querySelector('.giftInput').value = "";
}

async function createJoyBox(){
    const username = document.querySelector('.name').value;
    if (!username.trim()) {
        document.querySelector('.name').style.borderColor = 'red';
        document.querySelector('.error').style.innerHTML = "Enter a valid name";
        document.querySelector('.error').style.display = 'block';
        return;
    }
    try {
        const response = await fetch(`http://localhost:5500/api/gifts`, {
            method: 'POST', 
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username: username, gifts: gifts})
        });
        if (!response.ok) throw new Error('Failed to add gift');
        const result = await response.json();
        const userId = result.user._id;
        if(gifts.length == 0){
            document.querySelector('.name').style.borderColor = 'red';
            document.querySelector('.error').innerHTML = "Add gifts to your JoyBox";
            document.querySelector('.error').style.display = 'block';
            return;
        }
        try {
            // Construct the link for this specific user
            const joyBoxLink = `http://localhost:5500/html/page.html?userId=${userId}`;
    
            // Copy the link to the clipboard
            await navigator.clipboard.writeText(joyBoxLink);
    
            // Notify the user that the link has been copied
            document.querySelector('.create').innerHTML = 'Link Copied!';
            document.querySelector('.name').style.borderColor = 'black';
            document.querySelector('.error').style.display = 'none';

        } catch (error) {
            console.error("Failed to copy the link to the clipboard:", error);
            alert("Failed to copy the JoyBox link. Please try again.");
        }



        gifts = [];
        username.value = '';
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