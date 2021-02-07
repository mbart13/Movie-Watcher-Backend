export class User {

  constructor(public id: number,
              public email: string,
              public jwtToken: string,
              public tokenExpirationDate: Date) {}

  get token(): any {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
      return null;
    }
    return this.jwtToken;
  }
}
