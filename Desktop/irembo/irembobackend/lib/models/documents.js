"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mongoose = require('mongoose');
var documentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  documentType: {
    type: String,
    "enum": ["NID", "PASSPORT"],
    required: true
  },
  documentNumber: {
    type: String,
    required: true
  },
  documentImageUrl: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var Document = mongoose.model("Document", documentSchema);
var _default = Document;
exports["default"] = _default;