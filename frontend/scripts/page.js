let total = '';

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
