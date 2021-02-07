export class ResponseData {

  constructor(public userId: number,
              public email: string,
              public jwtToken: string,
              public expiresIn: number) {}
}
