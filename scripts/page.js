let total = '';


export async function addGift() {
    const giftText = document.querySelector('.giftInput').value; // gets the gift from the input box

    const newGift = {
        gift: giftText
    };

    try {
        // POST request to add the new gift
        const response = await fetch('http://localhost:5500/api/gifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type
            },
            body: JSON.stringify(newGift) // Convert the object to JSON
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Optionally, you can parse the response if you need to use the new gift data
        const addedGift = await response.json();

        // Re-render after adding a new gift
        initGiftDisplay(); 
    } catch (error) {
        console.error('Error adding gift:', error); // Handle any errors
    }
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
    await fetch('http://localhost:5500/api/gifts')
    .then(res => {
        console.log('p');
        res.json().then(data => { 
            giftRender(data);
        });
    })
}

initGiftDisplay();
