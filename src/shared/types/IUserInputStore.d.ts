export interface IUserInputData {

  value: number;
  frequency: number;
}

export interface IUserInputStats extends Array<IUserInputData> {}

export interface IUserInputStore {

  add(value: number): IUserInputStore;
  statistics: IUserInputStats;
}