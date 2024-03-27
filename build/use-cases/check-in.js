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

// src/use-cases/check-in.ts
var check_in_exports = {};
__export(check_in_exports, {
  CheckinUseCase: () => CheckinUseCase
});
module.exports = __toCommonJS(check_in_exports);

// src/erros/resource-not-exists.ts
var ResourceNotExist = class extends Error {
  constructor() {
    super("Resource does not exist.");
    this.name = "ResourceNotExist";
  }
};

// src/erros/user-already-check.ts
var UserAlreadyCheckError = class extends Error {
  constructor() {
    super("User already checked in today");
  }
};

// src/erros/user-too-far-gym.ts
var UserTooFarGym = class extends Error {
  constructor() {
    super("User is too far from gym");
  }
};

// src/utils/get-distance-between-coordinate.ts
function getDistanceBetweenCoordinates(from, to) {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }
  const fromRadian = Math.PI * from.latitude / 180;
  const toRadian = Math.PI * to.latitude / 180;
  const theta = from.longitude - to.longitude;
  const radTheta = Math.PI * theta / 180;
  let dist = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}

// src/use-cases/check-in.ts
var CheckinUseCase = class {
  constructor(checkInsRepository, gymsRepository) {
    this.checkInsRepository = checkInsRepository;
    this.gymsRepository = gymsRepository;
  }
  async execute({
    gymId,
    userId,
    userLatidute,
    userLongitude
  }) {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotExist();
    }
    const { latitude, longitude } = gym;
    const _latitude = latitude;
    const _longitude = longitude;
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatidute, longitude: userLongitude },
      { latitude: _latitude.toNumber(), longitude: _longitude.toNumber() }
    );
    const MAX_DISTANCE_IN_KIlOMETERS = 0.1;
    if (distance > MAX_DISTANCE_IN_KIlOMETERS) {
      throw new UserTooFarGym();
    }
    const sheckInOnSameDay = await this.checkInsRepository.findBtUserIdOnDate(
      userId,
      /* @__PURE__ */ new Date()
    );
    if (sheckInOnSameDay) {
      throw new UserAlreadyCheckError();
    }
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    });
    return {
      checkIn
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckinUseCase
});
