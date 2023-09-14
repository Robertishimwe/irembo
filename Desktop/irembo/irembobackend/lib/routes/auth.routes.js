"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _verify = _interopRequireDefault(require("../middleware/verify"));
var _auth = _interopRequireDefault(require("../controllers/auth.controller"));
var _auth2 = _interopRequireDefault(require("../validations/auth.Validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/login', _auth2["default"].loginDataValidation, _auth["default"].normalLogin);
router.post('/login-with-token', _auth["default"].loginWithToken);
router.post('/login-with-email', _auth["default"].loginWithEmail);
router.post('/reset-password', _auth["default"].resetPassword);
router.post('/forgot-password', _auth["default"].forgotPassword);
router.post('/logout', _verify["default"], _auth["default"].logoutUser);
var _default = router;
exports["default"] = _default;