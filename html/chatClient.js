//connect to server and retain the socket
//connect to same host that served the document
const socket = io('http://' + window.document.location.host)

function addMsg(message, ack){
  let username = document.getElementById('regName').value.trim()

  let msgDiv = document.createElement('div')
  if(username.toLowerCase() === message.sender.toLowerCase() && !ack &&
  message.private === "")
    msgDiv.style.color = "blue"
  else if(message.private !== "" && !ack)
    msgDiv.style.color = "red"
  msgDiv.textContent = message.text
  document.getElementById('messages').appendChild(msgDiv)
}

socket.on('serverSays', function(message) {
  let receivedMsgObj = JSON.parse(message)
  addMsg(receivedMsgObj, false)
})

socket.on("regAck", function(message){
  console.log(message)
  let disableUserName = document.getElementById('regName')
  disableUserName.setAttribute('disabled', '');
  document.getElementById('regButton').setAttribute('disabled', '');

  let receivedMsgObj = JSON.parse(message)
  addMsg(receivedMsgObj, true)
})

function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  let privateUsers = ""
  if(message === '') return //do nothing
  if(message.indexOf(":") !== -1){
    let privatemessge = message.split(":")
    message = privatemessge[1].trim()
    privateUsers = privatemessge[0].split(",")
    //get rid of blanks in, for example, "Anne, John, Frank:"
    for(let i=0; i<privateUsers.length; i++) privateUsers[i]=privateUsers[i].trim()
  }
  let dataObj = {"username": document.getElementById('regName').value.trim(), "text": message, "private": privateUsers}
  if(privateUsers === ""){
    console.log("public message")
    socket.emit('clientPublicSays', JSON.stringify(dataObj))
  } else {
    console.log(`private message: ${JSON.stringify(dataObj)}`)
    socket.emit('clientPrivateSays', JSON.stringify(dataObj))

  }
  document.getElementById('msgBox').value = ''
}

function clearMsgs(){
  while (document.getElementById('messages').childNodes.length > 1) {
    document.getElementById('messages').removeChild(document.getElementById('messages').lastChild);
  }
}

function registerUser() {

  let username = document.getElementById('regName').value.trim()
  console.log("Registering user: " +username)
  if(username === '') return //do nothing
  if(/^[a-zA-Z][a-zA-Z0-9]*$/.test(username) && username.indexOf(' ')=== -1){
    let dataObj = {"username": username, "text": "", private: ""}
    socket.emit('register', JSON.stringify(dataObj))
  } else{
    document.getElementById('regName').value = ''
  }
}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  if (event.keyCode === ENTER_KEY) {
    if(document.getElementById('regName').value !== "")
      sendMessage()
    return false //don't propogate event
  }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page
  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('regButton').addEventListener('click', registerUser)
  document.getElementById('clearBtn').addEventListener('click', clearMsgs)
  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
})
