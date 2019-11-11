import * as sinon from 'sinon';

import { expect } from './../assertions';
import Controller from '../../src/shared/core/controller';
import IController from '../../src/shared/types/IController';
import { IUserInputStore, IUserInputStats } from '../../src/shared/types/IUserInputStore';
import IDataSource from '../../src/shared/types/IDataSource';
import INotifier from '../../src/shared/types/INotifier';

const stubStore: IUserInputStore = {

  add: (value: number): IUserInputStore => { return undefined; },
  statistics: undefined
};

const stubDataSource: IDataSource<number> = {

  initialise: (): Promise<number> => { return undefined },
  itemExists: (item: number): boolean => { return false; }
};

const stubNotifier: INotifier = {

  isPaused: false,
  statsStream: undefined,
  togglePaused: (): void => {},
  finalise: (): void => {}
};

describe('Controller', () => {

  describe('#addNumber()', () => {
              
    let stubStoreAdd: sinon.SinonStub<[number], IUserInputStore>;
    let stubDataSourceItemExists: sinon.SinonStub<[number], boolean>;
    let controller: IController;
    
    before(() => {

      stubStoreAdd = sinon.stub(stubStore, 'add');
      stubDataSourceItemExists = sinon.stub(stubDataSource, 'itemExists').returns(true);
      
      controller = new Controller(stubStore, stubDataSource, undefined);
    });

    after(() => {

      stubStoreAdd.restore();
      stubDataSourceItemExists.restore();
    });
        
    it(`should add the number to the user input store`, () => {
      
      controller.addNumber(11);

      expect(stubStoreAdd.calledOnceWithExactly(11)).to.be.true;
    });

    it(`should check if the number exists in the data source and return the result`, () => {
      
      let result = controller.addNumber(11);

      expect(result).to.be.true;
    });    
  });

  describe('#statsStream', () => {
              
    const stubStats: IUserInputStats = [];
    let stubNotifierStats: sinon.SinonStub<any[], any>;
    let controller: IController;
    
    before(() => {

      stubNotifierStats = sinon.stub(stubNotifier, 'statsStream').get(() => stubStats);
      
      controller = new Controller(undefined, undefined, stubNotifier);
    });

    after(() => {

      stubNotifierStats.restore();
    });
        
    it(`should return the statsStream from the notifier`, () => {
      
      expect(controller.statsStream).to.deep.equal(stubStats);
    });
  });

  describe('#halt()', () => {
              
    let stubNotifierIsPaused: sinon.SinonStub<any[], any>;
    let stubNotifierTogglePaused: sinon.SinonStub<[], void>;
    let controller: IController;
    
    before(() => {

      stubNotifierIsPaused = sinon.stub(stubNotifier, 'isPaused').get(() => false);
      stubNotifierTogglePaused = sinon.stub(stubNotifier, 'togglePaused');
      
      controller = new Controller(undefined, undefined, stubNotifier);
    });

    after(() => {

      stubNotifierIsPaused.restore();
      stubNotifierTogglePaused.restore();
    });
        
    it(`should toggle the paused state on the notifier`, () => {
      
      controller.halt();
      
      expect(stubNotifierTogglePaused.calledOnce).to.be.true;
    });
  });

  describe('#resume()', () => {
              
    let stubNotifierIsPaused: sinon.SinonStub<any[], any>;
    let stubNotifierTogglePaused: sinon.SinonStub<[], void>;
    let controller: IController;
    
    before(() => {

      stubNotifierIsPaused = sinon.stub(stubNotifier, 'isPaused').get(() => true);
      stubNotifierTogglePaused = sinon.stub(stubNotifier, 'togglePaused');
      
      controller = new Controller(undefined, undefined, stubNotifier);
    });

    after(() => {

      stubNotifierIsPaused.restore();
      stubNotifierTogglePaused.restore();
    });
        
    it(`should toggle the paused state on the notifier`, () => {
      
      controller.resume();
      
      expect(stubNotifierTogglePaused.calledOnce).to.be.true;
    });
  });

  describe('#quit()', () => {
              
    const stubStats: IUserInputStats = [];
    let stubNotifierFinalise: sinon.SinonStub<[], void>;
    let stubStoreStats: sinon.SinonStub<any[], any>;
    let controller: IController;
    
    before(() => {

      stubNotifierFinalise = sinon.stub(stubNotifier, 'finalise');
      stubStoreStats = sinon.stub(stubStore, 'statistics').get(() => stubStats);
      
      controller = new Controller(stubStore, undefined, stubNotifier);
    });

    after(() => {

      stubNotifierFinalise.restore();
      stubStoreStats.restore();
    });
        
    it(`should call finalise on the notifier`, () => {
      
      controller.quit();

      expect(stubNotifierFinalise.calledOnce).to.be.true;
    });

    it(`should return the statistics from the user input store`, () => {
      
      let result = controller.quit();

      expect(result).to.deep.equal(stubStats);
    });    
  });
});