var addon = require('bindings')('addon');

var obj = new addon.CppTrader(0);

console.log( obj.receiveTrade(10) ); // 15

console.log( obj.receiveOb(10) ); // 15