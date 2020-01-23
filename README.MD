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



## python trader
the easiest way is to run in docker.

first build it.
```
docker build -t cpptrader:master .
```

Then make any changes in python and run it

```
docker run --rm -v $(pwd)/pythonSrc:/app/pythonSrc cpptrader:master
```

if you modify ts file, you need to rebuild the docker image.
