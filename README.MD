## getting started
```
npm ci
npm run tsc
node src/main.js
```

## instructions
this repo is for integrating with trading framework.

ReceiveTrade, ReceiveOb are 2 functions to receive live stream data, any decisioning logic can be done there, output trading instructions.

sample in cpptrader.cc

edit c++ file, and run this command to compile and run strategy.
```
node-gyp rebuild && npm run tsc && node src/main.js
```