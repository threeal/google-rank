#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const ora_1 = __importDefault(require("ora"));
const utils = __importStar(require("./utils"));
async function run() {
    utils.setupProgramArguments();
    commander_1.program.parse();
    const args = await utils.getProgramArguments();
    const rankByKeywords = [];
    for (const keyword of args.keywords) {
        const prom = utils.googleGetWebsiteRank(args.website, keyword, {
            maxPage: args.maxPage,
        });
        rankByKeywords.push([keyword, prom]);
    }
    process.stdout.write(`Ranks for ${chalk_1.default.blueBright(args.website)} website:\n`);
    const loading = (0, ora_1.default)("Getting ranks...");
    loading.start();
    for (const [keyword, prom] of rankByKeywords) {
        loading.text = `Getting ranks of ${chalk_1.default.blueBright(keyword)} keyword...`;
        const str = utils.formatKeywordRank(keyword, await prom);
        process.stdout.write(`\r\x1b[K${str}\n`);
    }
    loading.stop();
}
run();
//# sourceMappingURL=google-rank.js.map