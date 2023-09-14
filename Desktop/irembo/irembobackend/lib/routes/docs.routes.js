"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _multer = _interopRequireDefault(require("../helper/multer"));
var _verify = _interopRequireDefault(require("../middleware/verify"));
var _docs = _interopRequireDefault(require("../controllers/docs.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/add', _multer["default"].array('images', 1), _verify["default"], _docs["default"].addDocController);
var _default = router;
exports["default"] = _default;