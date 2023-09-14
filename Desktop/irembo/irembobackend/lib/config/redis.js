"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _redis = require("redis");
var redisClient = (0, _redis.createClient)({
  url: "redis://default:FHdKU1hZziQbA96oDEs7ucriTsjK2cxX@redis-15643.c263.us-east-1-2.ec2.cloud.redislabs.com:15643"
});
redisClient.on("connect", function () {
  console.log("Connected to Redis");
});
redisClient.on("error", function (err) {
  console.error("Error connecting to Redis:", err);
});
var _default = redisClient;
exports["default"] = _default;