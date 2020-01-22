const addon = require('bindings')('addon');
import {
    SimContractEx,
    TraderUltraTfClass,
    OrderBookSchema,
    ParamConfig,
    TradeDbSchemaV2,
    StrategyType,
} from 'basic-backtest';

const noPosition = {
    side: 0,
    amountCurrency: 0,
    price: 0,
    pair: 0,
};

function positionToCpp(position: SimContractEx.Position | null) {
    if (!position) return noPosition;
    return {
        ...position,
        side: position.side === 'buy' ? 0 : 1,
        pair: 0,
    }
}

const cppWrapper: StrategyType = {
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
    ] as ParamConfig[],
    processRawObs: (obs: OrderBookSchema[]) => {

    },
    getFitnessMetric: (options: TraderUltraTfClass) => {
        const winloss = options.getGainLossCount();
        return winloss.winLossRatio;
    },
    init: (options: TraderUltraTfClass) => {
        options.cpp = new addon.CppTrader(0);
    },
    onComplete: (options: TraderUltraTfClass) => {
        console.log(`gain loss getHistogram`, options.se.getGainLossHistogram());
    },
    onReceiveTrade: (
        trade: TradeDbSchemaV2,
        position: SimContractEx.Position | null,
        orders: SimContractEx.PendingOrderParams[],
        options: TraderUltraTfClass,
    ) => {
        const instructions = options.cpp.receiveTrade(trade, positionToCpp(position), orders);
        return instructions;
    },
    onReceiveOb: (
        ob: OrderBookSchema,
        position: SimContractEx.Position | null,
        orders: SimContractEx.PendingOrderParams[],
        options: TraderUltraTfClass,
    ) => {
        return options.cpp.receiveOb(ob, positionToCpp(position), orders);
    },
};
export default cppWrapper;
