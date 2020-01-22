"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addon = require('bindings')('addon');
const noPosition = {
    side: 0,
    amountCurrency: 0,
    price: 0,
    pair: 0,
};
function positionToCpp(position) {
    if (!position)
        return noPosition;
    return Object.assign(Object.assign({}, position), { side: position.side === 'buy' ? 0 : 1, pair: 0 });
}
const cppWrapper = {
    constants: [
        {
            key: 'placeOrderGap',
            value: 5000,
        },
        {
            key: 'enableSe2',
            value: false,
        },
        {
            key: 'baseSpreadPercent',
            value: 5 / 8000,
        },
    ],
    params: [
        {
            key: 'inteParam',
            max: 100,
            min: 1,
            type: 'integer',
        },
        {
            key: 'floatParam',
            max: 25 / 8000,
            min: 0,
            type: 'float',
        },
    ],
    processRawObs: (obs) => {
    },
    getFitnessMetric: (options) => {
        const winloss = options.getGainLossCount();
        return winloss.winLossRatio;
    },
    init: (options) => {
        options.cpp = new addon.CppTrader(0);
    },
    onComplete: (options) => {
        console.log(`gain loss getHistogram`, options.se.getGainLossHistogram());
    },
    onReceiveTrade: (trade, position, orders, options) => {
        const instructions = options.cpp.receiveTrade(trade, positionToCpp(position), orders);
        return instructions;
    },
    onReceiveOb: (ob, position, orders, options) => {
        return options.cpp.receiveOb(ob, positionToCpp(position), orders);
    },
};
exports.default = cppWrapper;
