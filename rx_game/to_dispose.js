function toDispose(terminateObservable$) {
  const subscriptions = [];

  subscriptions.push(terminateObservable$.subscribe(() => {
    subscriptions.forEach(subscription => subscription.dispose());
  }));

  return subscriptions;
}

export default toDispose;
