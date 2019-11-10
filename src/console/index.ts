import * as readline from 'readline';

import { showBanner } from './messages';
import { getUpdateDuration, goodbye } from './io';
import IController from '../shared/types/IController';
import wireup from '../shared/core/wireup';
import repl from './repl';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const initialise = async (): Promise<IController> => {

  const duration = await getUpdateDuration(rl);

  // TODO: Make sure duration is actually a number before blindly parseInt'ing it !!!
  //       Add validation if had more time...
  return await wireup(parseInt(duration));
};

const main = async (): Promise<void> => {

  showBanner();
  await repl(await initialise(), rl);
  await goodbye();

  rl.close();
}

main();