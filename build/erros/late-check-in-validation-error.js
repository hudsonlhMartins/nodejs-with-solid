"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/erros/late-check-in-validation-error.ts
var late_check_in_validation_error_exports = {};
__export(late_check_in_validation_error_exports, {
  LateCheckInValidationError: () => LateCheckInValidationError
});
module.exports = __toCommonJS(late_check_in_validation_error_exports);
var LateCheckInValidationError = class extends Error {
  constructor() {
    super("Check-in is expired");
    this.name = "LateCheckInValidationError";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LateCheckInValidationError
});
