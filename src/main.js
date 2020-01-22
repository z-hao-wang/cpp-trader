"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const basic_backtest_1 = require("basic-backtest");
/*
export interface Position {
    amountClosed?: number;
    amountCurrency: number; // amount remaining
    side: number;
    price: number;
    pairDb: number;
  }

Trade Schema:
 ts: number; // timestamp
 s: number;
 r: number;
 a: number;
 c: number; // pairDb


 */
// const obj = new addon.CppTrader(0);
// const position = {
//     amountCurrency: 100,
//     side: 0,
//     price: 9000,
//     pair: 0,
// }
// const activeOrders = [{
//     side: 0,
//     price: 9001,
//     amountCurrency: 100,
// }, {
//     side: 1,
//     price: 9003,
//     amountCurrency: 100,
// }];
// //  [ ts, side, price, amount, pair ]
// const trade = [1579470323360, 0, 9001.5, 0.12, 0];
//
// console.log( obj.receiveTrade(trade, position, activeOrders) ); // 15
//
// // [ts, pair, bid1.price, bid1.amount, ask1.price, ask1.amount, bid2.price, ...]
// const ob = [1579470323360, 0, 9001, 0.12, 9001.5, 0.4];
//
// console.log( obj.receiveOb(ob) ); // 15
const data = {
    tfArr: require('../data/trades.json'),
    obs: require('../data/obs.json'),
    fundingInfo: [],
    traderOptions: {
        basePath: '@src',
        version: 'pythonStrategy',
        isBackTest: true,
        startingPrinciple: 10,
        isFittingOnly: false,
        pairDb: 'USD_BTC_perpetual_swap',
        exchange: 'bitmex_fx',
        leverage: 5,
        takerFee: 0.00075,
        makerFee: -0.00025,
        initialAssetMap: { BTC: 10, USD: 0 },
        baseCurrencySymbol: 'USD',
        tradingPairDbCode: 0,
    }
};
const { trader, fitnessMetric } = basic_backtest_1.evaluateProfit(data);
console.log(`fitnessMetric`, fitnessMetric);
