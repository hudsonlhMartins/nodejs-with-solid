export class ResourceNotExist extends Error {
  constructor() {
    super('Resource does not exist.')
    this.name = 'ResourceNotExist'
  }
}
