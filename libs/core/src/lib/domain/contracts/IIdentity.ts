export interface IIdentityGenerator<T> {
  generate(): T | Promise<T>
}
