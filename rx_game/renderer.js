import Rx from 'rx';
import replicate from './replicate';
import { spacesToUnderscore } from './fn';
import toDispose from './to_dispose';

const renderString$ = new Rx.Subject();
const renderAverageTime$ = new Rx.Subject();
const renderLoseMessage$ = new Rx.Subject();
const renderWinMessage$ = new Rx.Subject();
const terminateGame$ = new Rx.Subject();

const textElement = window.text;
const errorElement = window.error;
const winElement = window.win;
const averageTimeElement = window.speed_value;

const subscriptions = toDispose(terminateGame$);

subscriptions.push(
  renderString$
    .subscribeOnNext(
      message => textElement.innerText = spacesToUnderscore(message)
    )
);

subscriptions.push(
  renderAverageTime$
    .subscribeOnNext(
      message => averageTimeElement.innerText = message
    )
);

subscriptions.push(
  renderLoseMessage$
    .subscribeOnNext(
      message => errorElement.innerText = message
    )
);

subscriptions.push(
  renderWinMessage$
    .subscribeOnNext(
      message => winElement.innerText = message
    )
);

subscriptions.push(terminateGame$.subscribe(() => {
  subscriptions.forEach(subscription => subscription.dispose());
}));

export default {
  observe,
}

function observe(view) {
  subscriptions.push(
    replicate(view.viewString$, renderString$),
    replicate(view.viewAverageTime$, renderAverageTime$),
    replicate(view.loseMessage$, renderLoseMessage$),
    replicate(view.winMessage$, renderWinMessage$),
    replicate(view.terminateGame$, terminateGame$)
  )
}
