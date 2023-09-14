"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _users = _interopRequireDefault(require("../controllers/users.controller"));
var _adminFunc = _interopRequireDefault(require("../controllers/adminFunc.controller"));
var _multer = _interopRequireDefault(require("../helper/multer"));
var _verify = _interopRequireDefault(require("../middleware/verify"));
var _auth = _interopRequireDefault(require("../validations/auth.Validation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/create', _auth["default"].verifyUserData, _users["default"].createUserController);
router.patch('/update', _multer["default"].array('images', 1), _verify["default"], _users["default"].updateUserContriller);
router.get('/get/all', _adminFunc["default"].listOfUsers);
router.get('/search/:searchString', _adminFunc["default"].generalUserSearch);
var _default = router;
exports["default"] = _default;