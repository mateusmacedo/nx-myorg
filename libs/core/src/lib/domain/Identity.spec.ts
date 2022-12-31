import { Identity } from './Identity'

describe('Identity', () => {
  let sut: Identity<string | number>
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should create an string identity with passed id', () => {
    sut = new Identity<string>('dummy')
    expect(sut).toBeInstanceOf(Identity)
    expect(sut.value).toBe('dummy')
  })
  it('should return false when pass null', () => {
    const id = new Identity<string>('dummy')
    expect(id.equals(null)).toBeFalsy()
  })
  it('should return false when pass undefined', () => {
    const id = new Identity<string>('dummy')
    expect(id.equals(undefined)).toBeFalsy()
  })
  it('should return true when compare two equal identities', () => {
    const id = new Identity<string>('dummy')
    const id2 = new Identity<string>('dummy')
    expect(id.equals(id2)).toBeTruthy()
  })
  it('should return false when compare two different identities', () => {
    const id = new Identity<string>('dummy')
    const id2 = new Identity<string>('dummy2')
    expect(id.equals(id2)).toBeFalsy()
  })
  it('should create an number identity with passed id', () => {
    sut = new Identity<number>(1)
    expect(sut).toBeInstanceOf(Identity)
    expect(sut.value).toBe(1)
  })
  it('should return true when compare two equal number identities', () => {
    const id = new Identity<number>(1)
    const id2 = new Identity<number>(1)
    expect(id.equals(id2)).toBeTruthy()
  })
  it('should return false when compare two different number identities', () => {
    const id = new Identity<number>(1)
    const id2 = new Identity(2)
    expect(id.equals(id2)).toBeFalsy()
  })
  it('should return false when id dont have a constructor', () => {
    const id = new Identity<number>(1)
    const id2 = { _id: 1 } as unknown as Identity<number>
    expect(id.equals(id2)).toBeFalsy()
  })
})
