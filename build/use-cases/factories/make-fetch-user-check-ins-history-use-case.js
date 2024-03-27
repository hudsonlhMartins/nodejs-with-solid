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

// src/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts
var make_fetch_user_check_ins_history_use_case_exports = {};
__export(make_fetch_user_check_ins_history_use_case_exports, {
  makeFetchUserCheckInsHistoryUseCase: () => makeFetchUserCheckInsHistoryUseCase
});
module.exports = __toCommonJS(make_fetch_user_check_ins_history_use_case_exports);

// src/use-cases/fetch-user-check-ins-history.ts
var FetchUserCheckInsHistoryUseCase = class {
  constructor(chekInsRepository) {
    this.chekInsRepository = chekInsRepository;
  }
  async execute({ userId, page = 1 }) {
    const checkIns = await this.chekInsRepository.findManyByUserId(userId, page);
    return {
      checkIns
    };
  }
};

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  PORT: import_zod.z.coerce.number().default(3333),
  NODE_ENV: import_zod.z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: import_zod.z.string()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.log("Invalid env", _env.error.format());
  throw new Error("Invalid env");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/repositories/prisma/prisma-check-ins-repository.ts
var import_dayjs = __toESM(require("dayjs"));
var PrismaCheckinsRepository = class {
  async create(data) {
    const checkIn = await prisma.checkIn.create({
      data
    });
    return checkIn;
  }
  async findBtUserIdOnDate(userId, date) {
    const startOfTheDay = (0, import_dayjs.default)(date).startOf("date");
    const endOfTheDay = (0, import_dayjs.default)(date).endOf("date");
    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          // gte means greater than or equal to
          lte: endOfTheDay.toDate()
          // lte means less than or equal to
        }
      }
    });
    return checkIn;
  }
  async findManyByUserId(userId, page) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: page ? (page - 1) * 20 : 0
    });
    return checkIns;
  }
  async countByUserId(userId) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    });
    return count;
  }
  async findById(id) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    });
    return checkIn;
  }
  async save(checkIn) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id
      },
      data: checkIn
    });
    return updatedCheckIn;
  }
};

// src/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts
function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInRepository = new PrismaCheckinsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInRepository);
  return useCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeFetchUserCheckInsHistoryUseCase
});
