import FibonacciDataSource from './fibonacciDataSource';
import UserInputStore from './userInputStore';
import Notifier from './notifier';
import Controller from './controller';
import IController from '../types/IController';

const fibonacciSequenceMax = 1000;
const dataSource = new FibonacciDataSource(fibonacciSequenceMax);
const userInputStore = new UserInputStore();
let notifier = undefined;

export default async (updateSeconds: number): Promise<IController> => {

  await dataSource.initialise();
  notifier = new Notifier(userInputStore, updateSeconds);
  
  return new Controller(userInputStore, dataSource, notifier);
};