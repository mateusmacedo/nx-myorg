import { v4 } from 'uuid'
import { IIdentityGenerator } from '../../domain/contracts/IIdentity'
export class UuidIdentityGenerator implements IIdentityGenerator<string> {
  generate(): string {
    return v4()
  }
}
