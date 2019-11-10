import * as readline from 'readline';

import { updateDuration, firstNumber, nextNumber, goodbye as goodbyeMessage } from './messages';

const askQuestion = (rl: readline.Interface, question: string): Promise<string> => {

  return new Promise<string>((resolve) => {

    // TODO: Use inquirer or such instead here so can validate the input, default, etc
    rl.question(`>> ${question}`, resolve);
  });
}

export const getUpdateDuration = (rl: readline.Interface) => {

  return askQuestion(rl, updateDuration);
};

export const getFirstNumber = (rl: readline.Interface) => {

  return askQuestion(rl, firstNumber);
};

export const getNextNumber = (rl: readline.Interface) => {

  return askQuestion(rl, nextNumber);
};

export const goodbye = (rl: readline.Interface) => {

  return askQuestion(rl, goodbyeMessage);
};