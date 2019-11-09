import { Observable, Subscription, interval, Observer } from 'rxjs';

import { IUserInputStore, IUserInputStats } from '../types/IUserInputStore';
import INotifier from '../types/INotifier';

class Notifier implements INotifier {
  
  private _isPaused: boolean = false;
  private _store: IUserInputStore;
  private _statsStream: Observable<IUserInputStats>;
  private _statsStreamObserver: Observer<IUserInputStats>;
  private _timerSubscription: Subscription;
  
  constructor(store: IUserInputStore, updateFrequencySeconds: number,
              // NOTE: Injecting / lazy-initialising the timer here for testing purposes only.
              //       If had more time to do properly, I would instead inject a TestScheduler and 
              //       initialise the interval from that for testing, then could use fake time / 
              //       marble testing approach instead of fake Observable.
              timer: Observable<number> = interval(updateFrequencySeconds * 1000)) {

    this._store = store;
    this._statsStream = Observable.create((o: Observer<IUserInputStats>) => { this._statsStreamObserver = o; });
    this._wireUpTimer(timer);
  }
  
  private _wireUpTimer(timer: Observable<number>): void {

    this._timerSubscription = timer.subscribe(() => { this._pumpStatistics(); });
  }

  private _pumpStatistics(): void {

    if (!this._isPaused && this._store.statistics.length > 0) {

      this._statsStreamObserver.next(this._store.statistics);
    }
  }

  get isPaused(): boolean {

    return this._isPaused;
  }
  
  get statsStream(): Observable<IUserInputStats> {

    return this._statsStream;
  }
  
  togglePaused(): void {
   
    this._isPaused = !this._isPaused;
  }

  finalise(): void {

    this._timerSubscription.unsubscribe();
    this._statsStreamObserver.complete();
  }
}

export default Notifier;