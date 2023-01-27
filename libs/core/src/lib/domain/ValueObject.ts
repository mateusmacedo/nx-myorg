import { ValueObjectProps } from './contracts/IShared'

export abstract class ValueObject<T extends ValueObjectProps> {
  protected props: T

  constructor(props: T) {
    const baseProps: T = {
      ...props
    }

    this.props = baseProps
  }
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false
    }
    if (vo.props === undefined) {
      return false
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
