let total = '';


export async function addGift(){
    const giftText = document.querySelector('.giftInput').value; // gets the gift from the input box
    
    const newGift = {
        gift: giftText
    };
    try {
        //POST request to add the new gift
        const response = await fetch('http://localhost:5500/api/gifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(newGift) // Convert the object to JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Optionally, you can fetch the updated list of gifts after adding a new one
        await initGiftDisplay(); // Re-render after adding a new gift
    } catch (error) {
        console.error('Error adding gift:', error); // Handle any errors
    }
    initGiftDisplay(); // Re-render after adding a new gift
}

function giftRender(gifts){
    console.log(gifts);
    total = '';

    gifts.forEach((gift) => {
        let Html = 
        `  
        <div class="gift">
            <button class="reserve-button"><img src="../images/circle.png" class="circle"></button>
            <p class="gift-text">${gift.name}</p>     
        </div>
        `;
        total += Html;
    });

    const container = document.querySelector(".gift-container");
    container.innerHTML = total; // Simplified rendering
}

async function initGiftDisplay() {
    try {
        const response = await fetch('http://localhost:5500/api/gifts'); // Fetch data once
        const gifts = await response.json(); // Parse the JSON response
        giftRender(gifts); // Render the data
    } catch (error) {
        console.error('Error fetching gifts:', error); // Handle any errors
    }
}

initGiftDisplay();
