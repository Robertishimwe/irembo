"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = _interopRequireDefault(require("./user.routes"));
var _auth = _interopRequireDefault(require("./auth.routes"));
var _docs = _interopRequireDefault(require("./docs.routes"));
var _admin = _interopRequireDefault(require("./admin.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.use('/user', _user["default"]);
router.use('/auth', _auth["default"]);
router.use('/docs', _docs["default"]);
router.use('/admin', _admin["default"]);
var _default = router;
exports["default"] = _default;