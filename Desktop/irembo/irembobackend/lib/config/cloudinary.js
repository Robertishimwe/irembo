"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _cloudinary = require("cloudinary");
var CLOUDINARY_API_SECRET = 'DHrOPw_7YBNXov-3OtylUN76rzs';
var CLOUDINARY_API_KEY = '988844114521336';
var CLOUDINARY_NAME = 'dke7g4hkw';
_cloudinary.v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});
var _default = _cloudinary.v2;
exports["default"] = _default;