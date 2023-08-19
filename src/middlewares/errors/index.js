import ErrorCode from "../../services/errors/enum.js";

export default (error, req, res, next) => {
 // console.log("entro al middlewaree este error sucedio ", error.code);
  switch (error.code) {
    case ErrorCode.INVALID_TYPES_ERROR:
      res.send({
        status: "error",
        error: error.name,
        message: error.message,
        cause: error.cause,
      });
      break;
    default:
      res.send({
        status: "error",
        error: "unhandled error",
      });
      break;
  }
};