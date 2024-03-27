"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/repositories/in-memory/in-memory-check-ins-repository.ts
var in_memory_check_ins_repository_exports = {};
__export(in_memory_check_ins_repository_exports, {
  InMemoryCheckInsRepository: () => InMemoryCheckInsRepository
});
module.exports = __toCommonJS(in_memory_check_ins_repository_exports);
var import_dayjs = __toESM(require("dayjs"));
var import_node_crypto = require("crypto");
var InMemoryCheckInsRepository = class {
  constructor(checkIns = []) {
    this.checkIns = checkIns;
  }
  async create(data) {
    const checkIn = {
      id: (0, import_node_crypto.randomUUID)(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: null,
      created_at: /* @__PURE__ */ new Date()
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }
  async findBtUserIdOnDate(userId, date) {
    const startOfDay = (0, import_dayjs.default)(date).startOf("date");
    const endOfDay = (0, import_dayjs.default)(date).endOf("date");
    const checInOnSameDate = this.checkIns.find((el) => {
      const checkInDate = (0, import_dayjs.default)(el.created_at);
      const isOnSameDay = checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay);
      return el.user_id === userId && isOnSameDay;
    });
    if (!checInOnSameDate)
      return null;
    return checInOnSameDate;
  }
  async findManyByUserId(userId, page) {
    return this.checkIns.filter((el) => el.user_id === userId).slice((page - 1) * 20, page * 20);
  }
  async countByUserId(userId) {
    return Promise.resolve(this.checkIns.filter((el) => el.user_id === userId).length);
  }
  async findById(id) {
    return this.checkIns.find((el) => el.id === id) || null;
  }
  async save(checkIn) {
    const index = this.checkIns.findIndex((el) => el.id === checkIn.id);
    if (index === -1)
      return checkIn;
    this.checkIns[index] = checkIn;
    return checkIn;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InMemoryCheckInsRepository
});
