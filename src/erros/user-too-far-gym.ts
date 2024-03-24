export class UserTooFarGym extends Error {
  constructor() {
    super('User is too far from gym')
  }
}