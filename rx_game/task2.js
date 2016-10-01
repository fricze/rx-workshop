import Rx from 'rx';
import { letters$ } from './task1.js';

// 2) implement limited time for hitting a correct key.
// After every keydown a timeout will be invoked. Use a timeout operator to
// produce a message of losing a game

// get interval value from an input with id `interval`
const defaultInterval = Number(window.interval.value);

// event will be emitted on a change of input value
const interval$ = Rx.Observable.fromEvent(window.interval, 'change')
// 1. map value to number
        .map(Number)
        .startWith(defaultInterval)
// 2. use `startWith` operator to emit default interval value on $interval stream

const lettersGame$ = letters$
        .distinctUntilChanged()
        .withLatestFrom(interval$)
// 3. combine letters$ stream with the latest value of interval$ string
// using a proper Rx operator
// 4. fix the code with timeout operator to throw an error when a time has exceeded
        .timeout(([ , interval]) => Rx.Observable.timer(interval))
        .subscribe((x) => {
          console.log(x)
        }, x => { alert(x) });
