import * as readline from 'readline';

import IController from '../shared/types/IController';
import { getFirstNumber, getNextNumber } from './io';
import { showStats, showBadInput } from './messages';

export default async (controller: IController, rl: readline.Interface): Promise<void>  => {

  const statsStreamSubscription = controller.statsStream.subscribe(showStats);

  // REPL here   
  
  showStats(controller.quit());
  statsStreamSubscription.unsubscribe();
};