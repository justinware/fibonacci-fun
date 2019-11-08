import { expect } from './../assertions';
import UserInputStore from '../../src/shared/core/userInputStore';

describe('UserInputStore', () => {

  describe('#constructor()', () => {
              
    it(`should initialise an empty numbers store`, () => {
      
      const store = new UserInputStore();
      
      expect(store.statistics.length).to.equal(0);
    });
  });

  describe('#add()', () => {
              
    const store = new UserInputStore();
    const result = store.add(10);

    it('should add the input number to the store', () => {
      
      expect(store.statistics[0]).to.deep.equal({ value: 10, frequency: 1 });
    });

    it('should return the store instance', () => {
      
      expect(result).to.equal(store);
    });
  });

  describe('#statistics', () => {
        
    const store = new UserInputStore().add(7).add(7).add(5).add(5).add(5).add(5);
    const expectedResult = [{ value: 5, frequency: 4 }, { value: 7, frequency: 2 }];

    it('should return an array of input numbers grouped by count', () => {
      
      expect(store.statistics).to.deep.equal(expectedResult);
    });

    it('should sort array by frequency in descending order', () => {
      
      expect(store.statistics[0].frequency).to.equal(4);
      expect(store.statistics[1].frequency).to.equal(2);
    });    
  });
});