#ifndef CPP_TRADER_H
#define CPP_TRADER_H

#include <napi.h>

class CppTrader : public Napi::ObjectWrap<CppTrader> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  CppTrader(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  Napi::Value ReceiveTrade(const Napi::CallbackInfo& info);
  Napi::Value ReceiveOb(const Napi::CallbackInfo& info);

  double value_;
};

#endif
