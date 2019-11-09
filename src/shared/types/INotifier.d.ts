import { Observable } from 'rxjs';

import { IUserInputStats } from './IUserInputStore';

interface INotifier {

  isPaused: boolean;
  statsStream: Observable<IUserInputStats>;
  togglePaused(): void;
  finalise(): void;
}

export default INotifier;