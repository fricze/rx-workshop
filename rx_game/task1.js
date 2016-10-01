import Rx from 'rx';
import { keyCodes } from './keycodes';

//Next values will be emitted on key down
const keyDown$ = Rx.Observable.fromEvent(window, 'keydown');
const charsToType = 'game'.split('');

// 1) Combine Rx operators in order to make a type game functionality.
// Every keydown event should be put on a stream, mapped into key code to a char
// and then compared with chars from given array (charsToType)
// When a char in a stream is the same as first char in the array, then this first
// char should be removed (so now, the second char will go onto first place)
// Stay pure and do not change charsToType array - only its copy

const identity = x => x;

// in order to get a proper property from a stream we can use `pluck` operator
export const letters$ = keyDown$.pluck("keyCode")
// to do something that will not effect a value on a stream we use `do` operator
  .do(keyCode => console.log(keyCode))
// 1. map keyCodes to the letters
  .map(keyCode => keyCodes[keyCode])
  .filter(identity)
// 2. use `scan` to apply logic of slicing array of characters
  .scan((acc, pressedKey) => acc.slice(pressedKey === acc[0]),
        charsToType) // initial value
  .do(string => console.log(string))

// letters$.filter(charArr => !!charArr.length)
// // 4. subscribe and log the winner message
//   .subscribe(() => {
//     console.log('you are still playing!')
//     // 5. dispose subscription
//   });

// // 3. filter on empty array of characters
// letters$.filter(charArr => !charArr.length)
// // 4. subscribe and log the winner message
//   .subscribe(() => {
//     console.log('you won!')
//     // 5. dispose subscription
//   });
