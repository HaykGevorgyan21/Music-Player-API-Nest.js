import * as Joi from "joi";


export const transformExtension = Joi.extend(joi => ({
  base: joi.array(),
  type: 'stringToArray',
  coerce: {
    from: 'string',
    method (value, sep) {
      if (typeof value !== 'string') {
        return { value: value }
      }
      return { value: value.split ? value.split(',') : value }
    }
  }
}))

export const JoiArrayConvertible = Joi.extend(joi => ({
  base: joi.array(),
  type: 'arrayConvertible',
  coerce: {
    from: 'string',
    method (value, sep) {
      if (typeof value !== 'string') {
        return { value: value }
      }
      return { value: Array.isArray(value) ? value : Array(value)}
    }
  }
}))
