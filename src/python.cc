#include <napi.h>
#include "pythonStrategy/pythontrader.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return PythonTrader::Init(env, exports);
}

NODE_API_MODULE(addon, InitAll)
