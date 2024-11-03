let total = '';

function giftRender(user){
    console.log(user.username);
    total = '';
    //work on the api, updating, adding.
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
    });

    const containerG = document.querySelector(".gift-container");
    containerG.innerHTML = total; // Simplified rendering
}



async function initGiftDisplay() {
    // Extract userId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    console.log(userId);
    // Check if userId is not null or empty
    if (!userId) {
        console.error('User ID is missing in the URL');
        return; // Exit if userId is invalid
    }

    try {
        // Fetch gifts for the given userId
        const response = await fetch(`http://localhost:5500/api/gifts/${userId}`);

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response data as JSON
        const user = await response.json();
        console.log(user);
        // Pass the fetched data to giftRender
        giftRender(user);
    } catch (error) {
        // Handle errors here
        console.error('Error fetching gifts:', error);
    }
}

initGiftDisplay();
