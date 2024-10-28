let total = '';


export async function addGift() {
    const giftText = document.querySelector('.giftInput').value; // gets the gift from the input box
    if(!giftText.trim()){//check if its empty
        console.log('please enter a gift')
        return;
    }

    const newGift = {name: giftText};// create new gift

    try {
        const response = await fetch('http://localhost:5500/api/gifts', {
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
