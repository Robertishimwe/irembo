"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var registrationSchema = _joi["default"].object({
  firstName: _joi["default"].string().empty().min(3).max(20).pattern(/^[a-zA-Z]/).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
    'string.pattern.base': '{{#label}} must contain only characters from a to z.'
  }),
  lastName: _joi["default"].string().empty().min(3).max(20).pattern(/^[a-zA-Z]/).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
    'string.pattern.base': '{{#label}} must contain only characters from a to z.'
  }),
  gender: _joi["default"].string().valid("MALE", "FEMALE").messages({
    'any.required': '{{#label}} field is required',
    'any.only': '{{#label}} must be either male, female or other',
    'string.base': '{{#label}} must be of type string'
  }),
  email: _joi["default"].string().required().email(),
  password: _joi["default"].string().required().empty().pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#*&]+)[\w@#*&]{8,}$/).messages({
    'any.required': '{{#label}} field is required',
    'string.base': '{{#label}} must be of type string',
    'string.empty': '{{#label}} can not be empty',
    'string.pattern.base': '{{#label}} must contain at least a number, a special character, an upper-case letter and longer than 8 characters'
  }),
  dateOfBirth: _joi["default"].string().regex(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/).message('{{#label}} must be in the format DD/MM/YYYY').custom(function (value, helpers) {
    var date = (0, _moment["default"])(value, 'DD/MM/YYYY');
    if (!date.isValid()) {
      return helpers.message('{{#label}} must be a valid date in the format DD/MM/YYYY');
    }
    return value;
  }).required().messages({
    'any.required': '{{#label}} field is required'
  })
});
var loginSchema = _joi["default"].object({
  email: _joi["default"].string().required().email(),
  password: _joi["default"].string().required().empty().messages({
    'any.required': '{{#label}} field is required',
    'string.empty': '{{#label}} can not be empty'
  })
});
var AuthValidation = /*#__PURE__*/_createClass(function AuthValidation() {
  _classCallCheck(this, AuthValidation);
});
_defineProperty(AuthValidation, "verifyUserData", function (req, res, next) {
  var _registrationSchema$v = registrationSchema.validate(req.body),
    error = _registrationSchema$v.error;
  if (error) {
    return res.status(422).json({
      error: error.details[0].message.replace(/["'`]+/g, '')
    });
  }
  next();
});
_defineProperty(AuthValidation, "loginDataValidation", function (req, res, next) {
  var _loginSchema$validate = loginSchema.validate(req.body),
    error = _loginSchema$validate.error;
  if (error) {
    return res.status(422).json({
      error: error.details[0].message.replace(/["'`]+/g, '')
    });
  }
  next();
});
var _default = AuthValidation;
exports["default"] = _default;