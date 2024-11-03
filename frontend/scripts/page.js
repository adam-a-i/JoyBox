let total = '';


export async function addGift() {
    const name = document.querySelector('.name');
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

    const newGift = {username: giftText};// create new gift

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


function giftRender(users){
    console.log(users);
    total = '';
    //work on the api, updating, adding.
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
        <div class="gift" data-user-id="${user._id}"data-gift-id="${gift._id}" data-gift-status="${gift.status}">
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
