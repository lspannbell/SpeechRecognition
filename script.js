const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

//create random number for the game
function getRandomNumber(){
    return Math.floor(Math.random()* 100) + 1;
}
console.log("Number: " + randomNum)

//initialize speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//create a variable to work with the Speech Recognition Object
let recognition = new window.SpeechRecognition();

//Start the game 
recognition.start();

//Listen for the result event
recognition.addEventListener('result', onSpeak);

//Create onSpeak function
function onSpeak(e){
    // console.log(e);
    const msg =e.results [0][0].transcript;
    console.log(msg);

writeMessage(msg);
checkNumber(msg);
}
//display msg to the screen
function writeMessage(msg){
    msgEl.innerHTML = `
        <div> You said: </div>
        <span class="box"> ${msg} </span>
        `;
}

//Check the msg against the number 
function checkNumber(msg){
    const num = +msg /*shorthand for converting string to a number*/
    //Check if a valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += '<div> That is not a valid number </div>';
        return;
    }

    //Check to ssee if number is in range
    if(num > 100 || num < 1)
    msgEl.innerHTML += '<div> Your number must be between 1-100 </div>';
    return;
}
//Check number against randomly generated number
if(num == randomNum){
    document.body.innerHTML = `
    <h2>Congrats! You guessed the number!
    <br>
    It was ${num}</h2>
    <button class="play-again" id="play-again"> Play Again </button>`
} else if (num > randomNum){
    msgEl.innerHTML += '<div> Go Lower </div>';
}
else {
    msgEl.innerHTML += '<div> Go Higher </div>'
}

//Allow use to continue to guess - End Speech recognition
recognition.addEventListener('end', ()=> recognition.start());

//Makethe play button work
document.body.addEventListener('click', e =>{
    if(e.target.id == 'play--again'){
        window.location.reload();
    }
})
