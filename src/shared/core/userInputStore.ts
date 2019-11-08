import * as _ from 'lodash';

import { IUserInputStore, IUserInputStats } from '../types/IUserInputStore';

class UserInputStore implements IUserInputStore {
  
  private _numbers: Array<number> = [];

  add(value: number): IUserInputStore {
    
    this._numbers.push(value);

    return this;
  }
  
  get statistics(): IUserInputStats {

    const numberCounts = _.countBy(this._numbers);
    
    return _.chain(Object.keys(numberCounts)
                         .map(k => ({ value: parseInt(k), frequency: numberCounts[k] })))
            .orderBy(['frequency'], ['desc'])
            .valueOf();
  }
}

export default UserInputStore;