import * as chalk from 'chalk';
import * as figlet from 'figlet';

import { IUserInputData, IUserInputStats } from '../shared/types/IUserInputStore';

const colours = {
  yellow: 'yellow',
  cyan: 'cyan',
  green: 'green',
  red: 'red'
};

const write = (colour: string, message: string): void => {

  console.log(chalk[colour](message));
};

export const updateDuration: string = 'Please input the number of time in seconds between emitting numbers and their frequency\n';
export const firstNumber: string = 'Please enter the first number\n';
export const nextNumber: string = 'Please enter the next number\n';
export const goodbye: string = `${chalk[colours.yellow]('Thanks for playing, press any key to exit.')}`;

export const banner = (): void => {

  console.clear();
  write(colours.yellow, figlet.textSync('Fibonacci Fun', { horizontalLayout: 'full' }));
  
  const message =
    `This program repeatedly asks to input a command or number, checks if input number is in
the 1st 1000 numbers of the Fibonacci sequence, and then displays input number frequency 
statistics (counts) on a user-specified timer.
    
To use the program enter a number when prompted OR one of the following commands:
    
  ${chalk[colours.cyan]('halt')}: pause the updates of number statistics
  ${chalk[colours.cyan]('resume')}: resume the updates of number statistics
  ${chalk[colours.cyan]('quit')}: terminate the program\n`;

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