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


function giftRender(users){
    console.log(users);
    total = '';

    users.forEach((user) => {
        let name = user.username;//display users name
        let nameHtml = `
        <p class="intro">Welcome to ${name}'s JoyBox</p>
        `;
        const container = document.querySelector(".header");
        container.innerHTML = nameHtml; // displaying user's name


        user.gifts.forEach((gift)=>{
        let Html;
        if(gift.status){// checks if gift has been reserved or not
        Html = // gift has id attribute to be used for PUT
        `  
        <div class="gift" data-gift-id="${gift.giftName}" data-gift-status="${gift.status}">
            <button class="reserve-button"><img src="../images/circle.png" class="circle"></button>
            <p class="gift-text">${gift.giftName}</p>     
        </div>
        `;}
        else{
        Html = // gift has id attribute to be used for PUT
        `  
        <div class="gift" data-gift-id="${gift.giftName} data-gift-status="${gift.status}">
            <button class="reserve-button"><img src="../images/circleChecked.png" class="circle"></button>
            <p class="gift-text">${gift.giftName}</p>     
        </div>
        `
        }
        total += Html;
    });});

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
