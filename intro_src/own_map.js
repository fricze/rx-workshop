import Rx from 'rx';

Rx.Observable.prototype.myMap = myMap;

function myMap(fn) {
  const that = this;
  return Rx.Observable.create(observer => {
    this.subscribe(
      value => observer.next(fn(value)),
      error => console.error(error),
      complete => console.log(complete)
    )
  });
}
const a$ = Rx.Observable.of(42,12,11);
const subscription = a$
        .do(x => console.log(x))
        .myMap(x => x + 1)
        .subscribe(a => console.log(a))

subscription.dispose();
