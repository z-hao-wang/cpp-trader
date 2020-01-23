## getting started
```
npm ci
npm run tsc
node src/main.js
```
Note: you will need special access to basic-backtest repo.

## c++ trader
this repo is for integrating with trading framework.

ReceiveTrade, ReceiveOb are 2 functions to receive live stream data, any decisioning logic can be done there, output trading instructions.

sample in cpptrader.cc

edit c++ file, and run this command to compile and run strategy.
```
node-gyp rebuild && npm run tsc && node src/mainCpp.js
```



## python trader
similar concept with c++ trader, can write core strategy in python. python file in pythonSrc/
the easiest way is to run in docker.
These commands works in mac, and probably work in linux. 

first build it.
```
bash ops/buildDocker.sh master
```

Then make any changes in pythonSrc/ and run it again

```
docker run --rm -v $(pwd)/pythonSrc:/app/pythonSrc cpptrader:master
```

if you modify ts file, you need to rebuild the docker image.
