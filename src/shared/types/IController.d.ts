import { Observable } from 'rxjs';

import { IUserInputStats } from './IUserInputStore';

interface IController {

  addNumber(value: number): boolean;
  statsStream: Observable<IUserInputStats>;
  halt(): void;
  resume(): void;
  quit(): IUserInputStats;
}

export default IController;