const py = require('bindings')('py');
import {
    ODSim,
    TraderUltraTfClass,
    OrderBookSchema,
    ParamConfig,
    TradeDbSchemaV2,
    StrategyType,
    ExistingOrderResponse,
    obDataUtils
} from 'basic-backtest';
import * as dataProcessingUtils from './utils/dataProcessingUtils';

const pythonWrapper: StrategyType = {
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
    processRawOb: (ob: OrderBookSchema, options: TraderUltraTfClass) => {
        // this is where we do some order book processing.
        obDataUtils.trimObLevel(ob, 5);
        if (!options.isBackTesting) {
            dataProcessingUtils.convertObAmountToBtcNotion(ob);
        }
    },
    getFitnessMetric: (options: TraderUltraTfClass) => {
        // const winloss = options.getGainLossCount();
        // return winloss.winLossRatio;
        return options.se.getAsset(options.pairDb);
    },
    init: (options: TraderUltraTfClass) => {
        options.py = new py.PythonTrader("pythonSample");
    },
    onComplete: (options: TraderUltraTfClass) => {
    },
    onReceiveTrade: (
        trade: TradeDbSchemaV2,
        position: ODSim.Position | null,
        orders: ExistingOrderResponse[],
        options: TraderUltraTfClass,
    ) => {
        const instructions = options.py.receiveTrade(JSON.stringify({trade, position, orders}));
        return JSON.parse(instructions);
    },
    onReceiveOb: (
        ob: OrderBookSchema,
        position: ODSim.Position | null,
        orders: ExistingOrderResponse[],
        options: TraderUltraTfClass,
    ) => {
        const instructions = options.py.receiveOb(JSON.stringify({ob, position, orders}));
        return JSON.parse(instructions);
    },
};
export default pythonWrapper;
