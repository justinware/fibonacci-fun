
import IDataSource from '../types/IDataSource';

class FibonacciDataSource implements IDataSource<number> {
  
  private _sequence: Array<number> = [0, 1];
  
  private _buildSequence(): void {

    const sequenceMax = 1000 - this._sequence.length;
    
    for (let i = 0; i < sequenceMax; i++) {
      
      this._sequence.push(this._sequence[i] + this._sequence[i + 1]);
    }
  }

  initialise(): Promise<number> {
    
    // Simulate loading data from an async source
    return new Promise<number>(resolve => {

      this._buildSequence();
      resolve(this._sequence.length);
    });
  }

  itemExists(item: number): boolean {
    
    if (this._sequence.length === 2) {

      throw new Error('DataSource not initialised');
    }

    return this._sequence.includes(item);
  }
}

export default FibonacciDataSource;