import { gifts } from "../data/gifts.js";

let total = '';
export function addGift(){
    const giftText = document.querySelector('.giftInput').value;//gets the gift from the input box
    gifts.push({
        gift: giftText
    })
    giftRender();
}


function giftRender(){
    total ='';
    gifts.forEach((gift) => {
        let Html =
    `
    <div class="gift">
        <button class="reserve-button"><img src="../images/circle.png" class="circle"></button>
        <p class="gift-text">${gift.gift}</p>     
    </div>
    `
    total+=Html;
    });

    const container = document.querySelector(".gift-container");
    container.innerHTML = '';
    container.innerHTML = total;

}