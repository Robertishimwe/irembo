"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 30,
    min: 3
  },
  lastName: {
    type: String,
    required: true,
    max: 30,
    min: 3
  },
  gender: {
    type: String,
    required: true,
    "enum": ["MALE", "FEMALE"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    max: 50,
    min: 3
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  maritalStatus: {
    type: String,
    "enum": ["MARRIED", "SINGLE", "DIVORCED", "WIDOWED"]
  },
  nationality: {
    type: String
  },
  verificationStatus: {
    type: String,
    "enum": ["VERIFIED", "UNVERIFIED", "PENDING-VERIFICATION"],
    "default": "PENDING-VERIFICATION"
  },
  password: {
    required: true,
    type: String
  },
  profilePicture: {
    type: String
  },
  document: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Document',
    unique: true,
    sparse: true
  },
  Role: {
    type: String,
    "enum": ["client", "admin"],
    "default": "client"
  },
  isMfaEnabled: {
    type: Boolean,
    "default": false
  },
  loginTokens: {
    type: Array
  },
  CreatedDate: {
    type: Date,
    "default": Date.now()
  }
});
var User = _mongoose["default"].model("User", UserSchema);
var _default = User;
exports["default"] = _default;