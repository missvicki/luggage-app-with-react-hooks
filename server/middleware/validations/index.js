import responseCodes from "../../constants/responseCodes";

export default class JoiValidator {
  static validateRequestBody(req, res, next, SchemaFunction) {
    const { body } = req;
    const { error } = SchemaFunction.validate(body);
    const errors = [];
    if (error) {
      error.details.forEach(e => {
        errors.push(e.message);
      });
      return res.status(responseCodes.BAD_REQUEST).send({
        Error: { message: errors[0] },
        Success: false
      });
    }
    next();
  }
}
