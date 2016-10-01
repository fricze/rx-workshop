import Rx from 'rx';
import replicate from './replicate';
import getCharFromKeyCode, {
  isEnter
} from './keycodes';
import { isValue } from './fn';
import toDispose from './to_dispose';
import {
  gameWonMessage$,
  gameLoseMessage$,
  timeoutLose
} from './game_end_messages';

const letter$ = new Rx.Subject();
const intervalChange$ = new Rx.Subject();
const intervalValue$ = new Rx.Subject();
const charTimeout$ = new Rx.Subject();
const gameWonReplicate$ = new Rx.Subject();
const startGameChange$ = new Rx.Subject();
const startGame$ = new Rx.Subject();

const keyCodes$ = letter$
        .withLatestFrom(startGame$, event => event)
        .pluck('keyCode')

const enterPress$ = letter$
        .pluck('keyCode')
        .filter(isEnter)

const allowedLetters$ = keyCodes$
        .map(getCharFromKeyCode)
        .filter(isValue);

const gameWon$ = gameWonMessage$.sample(
  gameWonReplicate$.filter(string => !string.length)
);

const gameLose$ = gameLoseMessage$
        .sample(
          keyCodes$
            .withLatestFrom(intervalValue$)
            .withLatestFrom(startGame$, charWithInterval => charWithInterval)
            .timeout(
              ([ , interval]) => Rx.Observable.timer(interval),
              Rx.Observable.just(timeoutLose)
            )
            .filter(val => val.type === 'lose')
        );

const terminateGame$ = Rx.Observable.merge(gameWon$, gameLose$);
const subscriptions = toDispose(terminateGame$);

subscriptions.push(terminateGame$.subscribe(() => {
  subscriptions.forEach(subscription => subscription.dispose());
}));

export default {
  letter$: allowedLetters$,
  intervalChange$: intervalChange$
    .pluck('currentTarget', 'value')
    .map(Number),
  gameLose$,
  gameWon$,
  terminateGame$,
  startGameChange$: startGameChange$.merge(enterPress$),
  observe,
};

function observe(view) {
  subscriptions.push(
    replicate(view.keyDown$, letter$),
    replicate(view.intervalChange$, intervalChange$),
    replicate(view.intervalValue$, intervalValue$),
    replicate(view.viewString$, charTimeout$),
    replicate(view.viewString$, gameWonReplicate$),
    replicate(view.startGameChange$, startGameChange$),
    replicate(view.startGame$, startGame$)
  )
}
