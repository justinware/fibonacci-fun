import * as readline from 'readline';

import IController from '../shared/types/IController';
import { getFirstNumber, getNextNumber } from './io';
import { showStats } from './messages';
import processInput from './processInput';

export default async (controller: IController, rl: readline.Interface): Promise<void>  => {

  const statsStreamSubscription = controller.statsStream.subscribe(showStats);
  let completed = processInput(await getFirstNumber(rl), controller);

  while (!completed) {

    completed = processInput(await getNextNumber(rl), controller);
  }

  showStats(controller.quit());
  statsStreamSubscription.unsubscribe();
};