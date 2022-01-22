let firstMsg = true;
let numberNow=0;
let problem='';
let lastUserText='';
document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('#ddbInput textarea');
  textarea.focus();
  textarea.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && event.target.value) {
      addMessage({text: event.target.value});
      lastUserText=event.target.value;
      event.preventDefault();
      reply(event.target.value);
      event.target.value = '';
    }
  });
});

function addMessage({text, fromDuck}) {
  const chatElt = document.createElement('p');
  chatElt.className = 'ddbChat';

  const borderElt = document.createElement('span');
  borderElt.className = `ddbChatBorder ${fromDuck ? 'ddbChatBorder-Duck' : 'ddbChatBorder-User'}`;
  chatElt.appendChild(borderElt);

  const authorElt = document.createElement('span');
  authorElt.className = 'ddbAuthorName';
  authorElt.innerHTML = "<b>" + (fromDuck ? 'duck' : 'you') + '</b>';
  chatElt.appendChild(authorElt);

  const messageElt = document.createElement('span');
  messageElt.className = 'ddbChatMessage';
  messageElt.innerHTML = formatMessageText(text);
  chatElt.appendChild(messageElt);

  const chatText = document.querySelector('#ddbChatText');
  chatText.appendChild(chatElt);
  chatText.scrollTop = chatText.scrollHeight;
}

function reply(prevMsg) {
  let reply = "quack ".repeat(1 + getRandomInt(3)).trim();
  if (prevMsg && prevMsg.endsWith("!")) {
    reply += "!";
  }
  if (numberNow===0){
  reply += "! Can you describe the problem in a line or two? Please use small sentences and be specific, I'm only a duck. ";
  numberNow=numberNow+1;
}
else if (numberNow===1){
  reply += "! What should I call this problem?  ";
  numberNow=numberNow+1;
}
else if (numberNow===2){
  problem=lastUserText;
  reply += "! Can you explain the flow of data in this "+problem+"? Did it work upto the previous stage?";
  numberNow=numberNow+1;
}
else if (numberNow===3){
  reply += "! Do you fully understand how it does what it does? Could you split "+problem+" into smaller chunks?";
  numberNow=numberNow+1;
}else if (numberNow===4){
  reply += "! Were you able to identify parts of "+problem+" that work and parts that do not? What are the 'known knowns', 'known unknowns', 'unknown unknowns'?";
  numberNow=numberNow+1;
}else if (numberNow===5){
  reply += "! Sorry, my super-duck-wisdom is limited. Please try google or stack overflow or platform specific forums? The web is full of acts of kindness. Or time to reach out for help to folks with human brains.";
  numberNow=numberNow+1;
}
  if (firstMsg) {
    timeout = 250;
  } else {
    timeout = 500 * (1 + Math.random() * 2);
    firstMsg = false;
  }
  setTimeout(() => addMessage({text: reply, fromDuck: true}), timeout);
}

function formatMessageText(text) {
  return text.replace(/&/g, '&amp;')
             .replace(/</g, '&lt;')
             .replace(/>/g, '&gt;')
             .replace(/"/g, '&quot;')
             .replace(/'/g, '&#039;')
             .replace(/\n/g, '<br/>');
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}