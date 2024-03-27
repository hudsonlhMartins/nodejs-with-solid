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

// src/use-cases/search-gyms.ts
var search_gyms_exports = {};
__export(search_gyms_exports, {
  SearchGymsUseCase: () => SearchGymsUseCase
});
module.exports = __toCommonJS(search_gyms_exports);
var SearchGymsUseCase = class {
  constructor(gymsRepository) {
    this.gymsRepository = gymsRepository;
  }
  async execute({
    query,
    page = 1
  }) {
    const gym = await this.gymsRepository.searchMany(query, page);
    return {
      gym
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SearchGymsUseCase
});
