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

// src/erros/user-too-far-gym.ts
var user_too_far_gym_exports = {};
__export(user_too_far_gym_exports, {
  UserTooFarGym: () => UserTooFarGym
});
module.exports = __toCommonJS(user_too_far_gym_exports);
var UserTooFarGym = class extends Error {
  constructor() {
    super("User is too far from gym");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserTooFarGym
});
