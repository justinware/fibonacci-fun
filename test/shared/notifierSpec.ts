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

  // TODO: Add tests around the async pumping of user input stats and the various conditions involved...if had more time.
  //       Do this be faking time with a TestScheduler or faking the timer observable, to force-pump the stats observable
});