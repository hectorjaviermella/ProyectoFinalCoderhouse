export default class CustomError {
  static createError({ name = "Error", cause, message, code, status }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = code;
    error.status = status;
    return error;
  }
}