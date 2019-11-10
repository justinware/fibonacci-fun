import IController from '../shared/types/IController';
import { showBadInput, showFib, showTimerPaused, showTimerResumed } from './messages';

export default (input: string, controller: IController):boolean => {

  const inputValue = input.toLowerCase();
  const inputNumber = parseInt(inputValue);

  switch (true) {

    case (inputValue === 'quit'): {

      return true;
    }

    case (inputValue === 'halt'): {

      controller.halt();
      showTimerPaused();
      break;
    }

    case (inputValue === 'resume'): {

      controller.resume();
      showTimerResumed();
      break;
    }

    case (isNaN(inputNumber)): {

      showBadInput();
      break;
    }

    default: {

      if (controller.addNumber(inputNumber)) {

        showFib();
      }
      break;
    }
  }

  return false;
};