export class BadRequestException extends Error {
  constructor(message){
    super(message);
    this.statusCode = 400;
  }
}
export class UnAuthorizad extends Error {
  constructor(message){
    super(message);
    this.statusCode = 401;
  }
}
export class ForbiddenException extends Error {
  constructor(message){
    super(message);
    this.statusCode = 403;
  }
}
export class ErrorHandle extends Error {
  constructor(message){
    super(message);
    this.statusCode = 404;
  }
}