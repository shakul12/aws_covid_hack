const popup = document.querySelector('.chat-popup');
const chatBtn = document.querySelector('.chat-btn');
const submitBtn = document.querySelector('.submit');
const chatArea = document.querySelector('.chat-area');
const inputElm = document.querySelector('input');
const emojiBtn = document.querySelector('#emoji-btn');
const picker = new EmojiButton();


// Emoji selection  
window.addEventListener('DOMContentLoaded', () => {

    picker.on('emoji', emoji => {
      document.querySelector('input').value += emoji;
    });
  
    emojiBtn.addEventListener('click', () => {
      picker.togglePicker(emojiBtn);
    });
  });        

//   chat button toggler 

chatBtn.addEventListener('click', ()=>{
    popup.classList.toggle('show');
})

// send msg 
submitBtn.addEventListener('click', ()=>{
    let userInput = inputElm.value;

    let temp = `<div class="out-msg">
    <span class="my-msg">${userInput}</span>
    <img src="img/me.jpg" class="avatar">
    </div>`;

    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';
    console.log("sending request")
    var xhr = new XMLHttpRequest();
        //xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
        var o=JSON.parse(this.responseText);

        var i;
        for (i = 0; i < o.body.tweets.length; i++) {
          var text = o.body.tweets[i];

          let temp = `<div class="income-msg">
    <span class="msg">${text}</span>
    <img src="img/person.jpg" class="avatar">
    </div>`;

    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';
        }

        
            //return true
        
      }
    });

    xhr.open("POST", 'https://9i1n6xy680.execute-api.us-east-2.amazonaws.com/dev/tweets');
    xhr.setRequestHeader("content-type", "application/json");
    var data = JSON.stringify({"message":userInput});
    xhr.send(data);

    

})