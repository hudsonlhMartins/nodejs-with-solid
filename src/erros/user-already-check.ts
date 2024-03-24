export class UserAlreadyCheckError extends Error {
    constructor() {
      super('User already checked in today')
    }
  }
  