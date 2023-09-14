"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _adminFunc = _interopRequireDefault(require("../controllers/adminFunc.controller"));
var _docs = _interopRequireDefault(require("../controllers/docs.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.post('/approve-and-verify', _adminFunc["default"].approveOrRejectDocumentAndVerifyUser);
router.get('/all-pending-request', _docs["default"].getAllPendingVerification);
var _default = router;
exports["default"] = _default;