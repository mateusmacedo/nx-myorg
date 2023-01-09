import { Identity } from './Identity'

export abstract class Entity<T, K> {
  protected readonly _id: Identity<K>
  protected readonly _props: T
  static isEntity(v: unknown): boolean {
    return v instanceof Entity
  }
  constructor(props: T, identity: Identity<K>) {
    this._id = identity
    this._props = props
  }
  get id(): Identity<K> {
    return this._id
  }
  get props(): T {
    return this._props
  }
  get record(): T & { _id: K } {
    return {
      _id: this._id.value,
      ...this._props
    }
  }
}
