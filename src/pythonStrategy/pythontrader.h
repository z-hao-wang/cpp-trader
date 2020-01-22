#ifndef PYTHON_TRADER_H
#define PYTHON_TRADER_H

#include <napi.h>

struct ActiveOrder {
  uint32_t side;
  float price;
  uint32_t amountCurrency;
  uint32_t pair; 
};

class PythonTrader : public Napi::ObjectWrap<PythonTrader> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  PythonTrader(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;

  Napi::Value ReceiveTrade(const Napi::CallbackInfo& info);
  Napi::Value ReceiveOb(const Napi::CallbackInfo& info);

  double value_;
};

#endif
