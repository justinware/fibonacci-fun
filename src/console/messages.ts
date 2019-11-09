import * as chalk from 'chalk';
import * as figlet from 'figlet';

const colours = {
  yellow: 'yellow',
  cyan: 'cyan',
  green: 'green',
  red: 'red'
};

const write = (colour: string, message: string): void => {

  console.log(chalk[colour](message));
};

export const banner = () => {

  write(colours.yellow, figlet.textSync('Fibonacci Fun', { horizontalLayout: 'full' }));
  
  const message =
    `This program repeatedly asks to input a command or number,
checks if input number is in the 1st 1000 Fibonacci sequence,
and then displays number frequency statistics on a timer.
    
Enter a number when prompted OR the following commands:
    
  ${chalk['green']('halt')}: pause the updates of number statistics
  ${chalk['green']('resume')}: resume the updates of number statistics
  ${chalk['green']('quit')}: terminate the program\n`;

  console.log(message);
};

// export const status = (message, success = true) => {

//   const colour = success ? colours.green : colours.red;
//   const icon = success ? figures.tick : figures.cross;

//   write(colour, `${icon} ${message}`);
// };