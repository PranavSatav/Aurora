import bot from './assets/bot.gif';
import user from './assets/user.gif';

const form =document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;
// while loading the chat once the text is put
//it will show 3 dots one by one

function loader(element){
  element.textContent ='';
  loadInterval = setInterval(()=>{
    element.textContent+='.';
    
    if(element.textContent === '....')
      element.textContent='';
    //it repeats in every 300 milliseconds
  },300);
}

//we want it to type word by word

function typeText(element,text) {
  let index =0;
  let interval =setInterval(()=>{
    if(index < text.length){
      element.innerHTML+= text.charAt(index);
      index++;
    }
    else{
      clearInterval(interval);
    }
    //it types text in every 20 milliseconds
  },20)
}

// we want a unique id for every timestamp

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalNumber =randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalNumber}`;

}
function chatStripe (isAi, value, uniqueId) {
  return (
    `
  <div class="wrapper ${isAi && 'ai'}">
    <div class="chat">
      <div class="profile">
      <img
          src=${isAi ? bot: user}
          alt="${isAi ? 'bot' : 'user'}"
      />
      </div>
      <div class="message" id=${uniqueId}> ${value}</div>
    </div>
  </div>
  `
  )
  }

const handleSubmit = async (e) =>{
  e.preventDefault();
  const data = new FormData(form);
  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  //reset the form
  form.reset();
  // bot's chatstripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe (true," ",uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader (messageDiv);
  
  //this function is used to send the prompt as json , via POST request to the server
const response = await fetch('https://aurora-w2ae.onrender.com/', {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  prompt: data.get('prompt')
})
})


//NOW  remove the ... running in the server 
clearInterval(loadInterval);
messageDiv.innerHTML ='';//set the bot to  <NULL>

if(response.ok){
  const data =await response.json(); //get the response
  const parseData = data.bot.trim();
  typeText(messageDiv, parseData);
}
else {
  const err = await response.text();
  messageDiv.innerHTML = "Oops! Something went wrong Reload!";
  alert(err);
}

}



form. addEventListener('submit', handleSubmit);
//however we use enter keypress - key 13
form.addEventListener('keydown',(e)=>{

  if(e.keyCode === 13){
    handleSubmit(e);
  }
});
