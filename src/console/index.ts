import { banner } from './messages';

import IController from '../shared/types/IController';
import wireup from '../shared/core/wireup';

console.clear();
banner();

let controller: IController = undefined;

wireup(10)
  .then((c) => { controller = c; })
  .then(() => {

    console.log('Ready');
  });