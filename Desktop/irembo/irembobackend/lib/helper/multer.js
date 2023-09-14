"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var storage = _multer["default"].diskStorage({
  filename: function filename(req, file, cb) {
    cb(null, "".concat(new Date().toISOString().replace(/:/g, '-'), "-").concat(file.originalname));
  }
});
var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/webp' || file.mimetype === 'image/pdf') {
    cb(null, true);
  } else {
    cb({
      message: 'unsupported file format'
    }, false);
  }
};
var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  },
  fileFilter: fileFilter
});
var _default = upload;
exports["default"] = _default;