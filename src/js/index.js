const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

//*First pull in all the DOM elements create selectedWord array that generates random word
//*Second create two arrays correctLetters and wrongLetters to store 
//*Third create function displayWord to show hidden word
//*Fourth add keydown eventListener when clicking a letter on keyboard to fire off an event
//*Fifth create updateWrongLetters function and showNotification function
//*Sixth add play again button eventListener and functions to empty our correctLetters and wrongLetters arrays

//gives you random word from words array up top
let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
//take wordEl and set innerHTML to the selectedWord
//will take selectedWord and turn it into an array split()
//map through the array and seeing if the letter is included in the array
//letter section says is the current letter we're looping through included in corrected letters
//if it is included then output the letter , else it's going to be an empty string
//turning it back into an array join()
//innerWord const changes letters into a reg expression instead a letters output one by one on console in column form
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';

    playable = false;
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts by checking index of array
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = 'flex';

    playable = false;
  }
}

// Show notification
//add the show class to display the notification "you've already entered that..."
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Keydown letter press
//if we enter a ? or % don't want it to fire off, will use keycodes each key has a keycode letters go from 65-90
//with each key press we want to check to see if it is the right or wrong then push it to it's respective array correctLetters , wrongLetters
window.addEventListener('keydown', e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {  //find out if letter is in selectedWord
          wrongLetters.push(letter);

          updateWrongLettersEl(); //after push wrong letters want it to display on screen
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  playable = true;

  //  Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();