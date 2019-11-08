interface IDataSource<T> {

  initialise(): Promise<number>;
  itemExists(item: T): boolean;
};

export default IDataSource;