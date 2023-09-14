"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _express = _interopRequireDefault(require("express"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _cluster = _interopRequireDefault(require("cluster"));
var _helmet = _interopRequireDefault(require("helmet"));
var _cors = _interopRequireDefault(require("cors"));
var _os = _interopRequireDefault(require("os"));
var _index = _interopRequireDefault(require("./routes/index"));
var _database = _interopRequireDefault(require("./config/database"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
dotenv.config();
var numCPUs = _os["default"].cpus().length;
if (_cluster["default"].isMaster) {
  console.log("Master ".concat(process.pid, " is running"));

  // Fork workers
  for (var i = 0; i < numCPUs; i++) {
    _cluster["default"].fork();
  }
  _cluster["default"].on("exit", function (worker, code, signal) {
    console.log("worker ".concat(worker.process.pid, " died"));
  });
} else {
  // Worker processes have a http server.
  var app = (0, _express["default"])();
  (0, _database["default"])();
  app.use(_express["default"].json());
  app.use((0, _helmet["default"])());
  app.use((0, _cors["default"])({
    origin: '*'
  }));
  app.use('/api', _index["default"]);

  // Define a route
  app.get("/", function (req, res) {
    res.send("Hello from worker ".concat(process.pid));
  });
  app.get("/test", function (req, res) {
    res.send("Hello from worker ".concat(process.pid));
  });
  var PORT = process.env.PORT || 5000;
  app.listen(PORT, function () {
    console.log("Worker ".concat(process.pid, " started on PORT ").concat(PORT));
  });
}