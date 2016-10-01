import { letterCodes } from '../rx_game/keycodes';

const startButton = window.start_listening;
const stopButton = window.stop_listening;

const keyDownCollection = [];

// prototypes are easy!
Array.prototype.showCollection = function showCollection() {
  const collection = this;

  console.log(collection);

  const lettersCodesOnly = collection.filter(code => !!letterCodes[code]);
  console.log(lettersCodesOnly);

  const justLetters = lettersCodesOnly.map(code => letterCodes[code]);
  console.log(justLetters);

  const uppercaseLetters = lettersCodesOnly
          .map(code => letterCodes[code])
          .map(letter => letter.toUpperCase());
  console.log(uppercaseLetters);

  const noDuplicates = justLetters.reduce((arr, letter) => {
    if (!arr.includes(letter)) {
      arr.push(letter);
    }

    return arr;
  }, []);
  console.log(noDuplicates);

  // chaining Array operators
  const noDuplicatesChained = collection
          .filter(code => !!letterCodes[code])
          .map(code => letterCodes[code])
          .reduce((arr, letter) => {
            if (!arr.includes(letter)) {
              arr.push(letter);
            }

            return arr;
          }, []);
  console.log(noDuplicatesChained);
}

const keyDownListener = e => {
  keyDownCollection.push(e.keyCode);
};

startButton.addEventListener('click', () => {
  document.body.addEventListener('keydown', keyDownListener);
});

stopButton.addEventListener('click', () => {
  document.body.removeEventListener('keydown', keyDownListener);

  keyDownCollection.showCollection();
});
