import chalk, { Chalk } from 'chalk';
import figlet from 'figlet';

import { IUserInputData, IUserInputStats } from '../shared/types/IUserInputStore';

const colours = {
  yellow: 'yellow',
  cyan: 'cyan',
  green: 'green',
  red: 'red'
};

const chalkFuncMap = new Map<string, Chalk>();
chalkFuncMap.set(colours.yellow, chalk.yellow);
chalkFuncMap.set(colours.cyan, chalk.cyan);
chalkFuncMap.set(colours.green, chalk.green);
chalkFuncMap.set(colours.red, chalk.red);

const write = (colour: string, message: string): void => {

  console.log(chalkFuncMap.get(colour)(message));
};

export const updateDuration: string = 'Please input the number of time in seconds between emitting numbers and their frequency\n';
export const firstNumber: string = 'Please enter the first number\n';
export const nextNumber: string = 'Please enter the next number\n';

export const showBanner = (): void => {

  console.clear();
  write(colours.yellow, figlet.textSync('Fibonacci Fun', { horizontalLayout: 'full' }));

  const message =
    `Author: Justin Ware\n
This program repeatedly asks to input a command or number, checks if input number is in
the 1st 1000 numbers of the Fibonacci sequence, and then displays input number frequency
statistics (counts) on a user-specified timer.

To use the program enter a number when prompted OR one of the following commands:

  ${chalk.cyan('halt')}: pause the updates of number statistics
  ${chalk.cyan('resume')}: resume the updates of number statistics
  ${chalk.cyan('quit')}: terminate the program\n`;

  console.log(message);
};

export const showBadInput = (): void => {

  write(colours.red, 'Bad input. Please enter a valid number or one of the commands: halt, resume or quit.');
};

export const showStats = (stats: IUserInputStats) => {

  const statsText = stats.map((s: IUserInputData) => `${s.value}:${s.frequency}`)
                         .join(', ');

  write(colours.green, statsText);
};

export const showFib = () => {

  write(colours.green, 'FIB');
};

export const showTimerPaused = () => {

  write(colours.yellow, 'Timer paused');
};

export const showTimerResumed = () => {

  write(colours.yellow, 'Timer resumed');
};

export const showGoodbye = () => {

  write(colours.yellow, 'Thanks for playing, press any key to exit.');
};
