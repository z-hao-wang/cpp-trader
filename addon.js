var addon = require('bindings')('addon');

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
const obj = new addon.CppTrader(0);
const position = {
    amountCurrency: 100,
    side: 0,
    price: 9000,
    pair: 0,
}
const activeOrders = [{
    side: 0,
    price: 9001,
    amountCurrency: 100,
}, {
    side: 1,
    price: 9003,
    amountCurrency: 100,
}];
//  [ ts, side, price, amount, pair ]
const trade = [1579470323360, 0, 9001.5, 0.12, 0];

console.log( obj.receiveTrade(trade, position, activeOrders) ); // 15

// [ts, pair, bid1.price, bid1.amount, ask1.price, ask1.amount, bid2.price, ...]
const ob = [1579470323360, 0, 9001, 0.12, 9001.5, 0.4];
console.log( obj.receiveOb(ob) ); // 15
