export function addGift(){
    const giftText = document.querySelector('.giftInput').value;//gets the gift from the input box

    giftRender(giftText);
}


function giftRender(gift){//generates the new gift's html and adds it to the page
    let totalHtml =
    `
    <div class="gift">
        <button class="reserve-button"><img src="../images/circle.png" class="circle"></button>
        <p class="gift-text">${gift}</p>     
    </div>
    `
    const container = document.querySelector(".gift-container");
    container.innerHTML += totalHtml;

}