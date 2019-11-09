import { Observable } from 'rxjs';

import { IUserInputStats, IUserInputStore } from '../types/IUserInputStore'
import IDataSource from '../types/IDataSource';
import INotifier from '../types/INotifier';
import IController from '../types/IController';

class Controller implements IController {
  
  private _store: IUserInputStore;
  private _dataSource: IDataSource<number>;
  private _notifier: INotifier;

  constructor(store: IUserInputStore, dataSource: IDataSource<number>, notifier: INotifier) {

    this._store = store;
    this._dataSource = dataSource;
    this._notifier = notifier;
  }
  
  addNumber(value: number): boolean {
  
    this._store.add(value);
    return this._dataSource.itemExists(value);
  }
  
  get statsStream(): Observable<IUserInputStats> {

    return this._notifier.statsStream;
  }

  halt(): void {
    
    if (!this._notifier.isPaused) {

      this._notifier.togglePaused();
    }
  }
  
  resume(): void {
    
    if (this._notifier.isPaused) {

      this._notifier.togglePaused();
    }
  }
  
  quit(): IUserInputStats {
    
    this._notifier.finalise();
    
    return this._store.statistics;
  }
}

export default Controller;