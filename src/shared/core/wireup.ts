import FibonacciDataSource from './fibonacciDataSource';
import UserInputStore from './userInputStore';
import Notifier from './notifier';
import Controller from './controller';

const fibonacciSequenceMax = 1000;
const dataSource = new FibonacciDataSource(fibonacciSequenceMax);
const userInputStore = new UserInputStore();
let notifier = undefined;

export default async (updateSeconds: number) => {

  await dataSource.initialise();
  notifier = new Notifier(userInputStore, updateSeconds);
  
  return new Controller(userInputStore, dataSource, notifier);
};