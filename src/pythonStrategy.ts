const py = require('bindings')('py');
import {
    SimContractEx,
    TraderUltraTfClass,
    OrderBookSchema,
    ParamConfig,
    TradeDbSchemaV2,
    StrategyType,
} from 'basic-backtest';

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
            key: 'intParam',
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
        options.py = new py.PythonTrader("pythonSample");
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
        const instructions = options.py.receiveTrade(JSON.stringify({trade, position, orders}));
        
        return JSON.parse(instructions);
    },
    onReceiveOb: (
        ob: OrderBookSchema,
        position: SimContractEx.Position | null,
        orders: SimContractEx.PendingOrderParams[],
        options: TraderUltraTfClass,
    ) => {
        const instructions = options.py.receiveOb(JSON.stringify({ob, position, orders}));
        return JSON.parse(instructions);
    },
};
export default cppWrapper;
