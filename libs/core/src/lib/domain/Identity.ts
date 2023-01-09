export type TIdentity = string | number
export class Identity<T> {
  private _id: T
  constructor(id: T) {
    this._id = id
  }
  get value(): T {
    return this._id
  }
  equals(id: Identity<T>): boolean {
    if (id === null || id === undefined) {
      return false
    }
    if (!(id instanceof this.constructor)) {
      return false
    }
    return this._id === id._id
  }
}
