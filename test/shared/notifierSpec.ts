import { Observable, Observer } from 'rxjs';

import { IUserInputStore, IUserInputStats } from '../../src/shared/types/IUserInputStore';
import { expect } from './../assertions';
import Notifier from '../../src/shared/core/notifier';

let stubTimerObserver: Observer<number> = undefined;
const stubTimer: Observable<number> = Observable.create((o: Observer<number>) => { stubTimerObserver = o; });
const stubStats: IUserInputStats = [{ value: 15, frequency: 4 }];
const stubStore: IUserInputStore = {

  add: () => { return stubStore; },
  statistics: stubStats
};

const notifier = new Notifier(stubStore, 2, stubTimer);

describe('Notifer', () => {

  describe('#constructor()', () => {
              
    it(`should default isPaused to false`, () => {
      
      expect(notifier.isPaused).to.be.false;
    });

    it(`should initialise the stats stream`, () => {
      
      expect(notifier.statsStream).to.not.be.undefined;
    });
  });

  describe('#togglePaused()', () => {
              
    it(`should toggler isPaused state`, () => {
    
      const localNotifier = new Notifier(undefined, undefined, stubTimer);
      localNotifier.togglePaused();

      expect(localNotifier.isPaused).to.be.true;
    });
  });

  describe('#finalise()', () => {
              
    it(`should end the timer stream and complete the stats stream`, () => {
    
      let statsStreamComplete: boolean = false;
      const localNotifier = new Notifier(undefined, undefined, stubTimer);
      localNotifier.statsStream.subscribe(() => {}, () => {}, () => { statsStreamComplete = true; });
      
      localNotifier.finalise();

      expect(statsStreamComplete).to.be.true;
    });
  });

  describe('#statsStream', () => {
              
    it(`should pump when the timer fires and notifier is not paused`, () => {
    
      // let pumpCount = 0;
      // let lastResult = undefined;
      // let statsStreamSubscription = notifier.statsStream.subscribe((r: IUserInputStats) => { lastResult = r; pumpCount++; console.log(pumpCount); });
      
      // stubTimerObserver.next(1);
      // stubTimerObserver.next(99);
      // stubTimerObserver.next(99);

      // console.log(lastResult);
      
      // //expect(pumpCount).to.equal(3);
      // //expect(lastResult).to.deep.equal(stubStats);

      // statsStreamSubscription.unsubscribe();
    });

    it(`should not pump when the notifier is paused`, () => {
    

    });
  });  
});