#include <napi.h>
#include "cpptrader.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return CppTrader::Init(env, exports);
}

NODE_API_MODULE(addon, InitAll)
