"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var connectdb = function connectdb() {
  _mongoose["default"].connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    console.log("database connected......");
  })["catch"](function (error) {
    console.log("database not connected" + error);
  });
};
var _default = connectdb;
exports["default"] = _default;