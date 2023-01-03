import { Identity, TIdentity } from './Identity'

export abstract class Entity<T> {
  protected readonly _id: Identity<TIdentity>
  protected readonly _props: T
  static isEntity(v: unknown): boolean {
    return v instanceof Entity
  }
  constructor(props: T, identity: Identity<TIdentity>) {
    this._id = identity
    this._props = props
  }
  get id(): Identity<TIdentity> {
    return this._id
  }
  get props(): T {
    return this._props
  }
  get record(): T & { id: TIdentity } {
    return {
      id: this._id.value,
      ...this._props
    }
  }
}
