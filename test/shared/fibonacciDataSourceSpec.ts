import { expect } from './../assertions';
import FibonacciDataSource from '../../src/shared/core/fibonacciDataSource';

describe('FibonacciDataSource', () => {

  describe('#initialise()', () => {
              
    it('should load the 1st 1000 numbers of the Fibonacci Sequence', () => {
      
      const dataSource = new FibonacciDataSource();

      return expect(dataSource.initialise()).to.eventually.equal(1000);
    });
  });

  describe('#itemExists()', () => {
              
    it('should throw an error if the data source is not initialised', () => {
      
      const dataSource = new FibonacciDataSource();

      expect(() => { dataSource.itemExists(5); }).to.throw('DataSource not initialised');
    });

    it('should return true if input number is in Fibonacci Sequence', async () => {
      
      const dataSource = new FibonacciDataSource();
      await dataSource.initialise();
      
      expect(dataSource.itemExists(8)).to.be.true;
      expect(dataSource.itemExists(6765)).to.be.true;
    });

    it('should return false if input number is not in Fibonacci Sequence', async () => {
      
      const dataSource = new FibonacciDataSource();
      await dataSource.initialise();
      
      expect(dataSource.itemExists(7)).to.be.false;
    });
  });
});