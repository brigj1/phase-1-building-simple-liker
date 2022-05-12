// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errModalDiv = document.querySelector('#modal')
const errModalEl = errModalDiv.querySelector('h2')
const modalMsgEl = document.querySelector('#modal-message')

// init step(s)
// Add the .hidden class to the error modal in the HTML so it does not appear when the page first loads
errModalDiv.classList.add('hidden')



// Set up eventListener for all elements of: <span class="like-glyph">♡</span>
const likeElms = document.querySelectorAll('.like-glyph')

// When a user clicks on a heart:
likeElms.forEach(likeElm => likeElm.addEventListener('click',(e)=>{
// Now that we have been clicked, is the heart full or not?
    if (likeElm.textContent === FULL_HEART) {
// * Change the heart back to an empty heart
      likeElm.textContent = EMPTY_HEART
// * Remove the .activated-heart class
      likeElm.classList.remove('activated-heart')
    }
    else {
// the user has clicked on an empty heart:
// * Invoke mimicServerCall to simulate making a server request
      mimicServerCall()
      .then(ret => {
// If the "server" returns a success status:
// * Change the heart to a full heart
        likeElm.textContent = FULL_HEART
// * Add the .activated-heart class to make the heart appear red
        likeElm.classList.add('activated-heart')
      })
// Else the server had a failure...
// * Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
      .catch(function (errorMsg) {
// * Display the server error message in the modal
        modalMsgEl.textContent = errorMsg;
// * Display the error modal by removing the .hidden class
        errModalDiv.classList.remove('hidden')
// * Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
        setTimeout(() => errModalDiv.classList.add('hidden'), 3000);
      });
    }
}))

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      //let isRandomFailure = Math.random() < .2
      let isRandomFailure = Math.random() < .5
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
