import Rx from 'rx';

export const timeoutLose = {
  message: 'timeout',
  type: 'lose'
};

const gameWon = {
  message: 'you won you!',
  type: 'win'
};

export const gameWonMessage$ = Rx.Observable.just(gameWon);
export const gameLoseMessage$ = Rx.Observable.just(timeoutLose);
