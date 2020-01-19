#include "cpptrader.h"
using namespace Napi;

Napi::FunctionReference CppTrader::constructor;

Napi::Object CppTrader::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func =
      DefineClass(env,
                  "CppTrader",
                  {
                   InstanceMethod("receiveTrade", &CppTrader::ReceiveTrade),
                   InstanceMethod("receiveOb", &CppTrader::ReceiveOb)
                   });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("CppTrader", func);
  return exports;
}

CppTrader::CppTrader(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<CppTrader>(info) {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  int length = info.Length();

  if (length <= 0 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Number value = info[0].As<Napi::Number>();
  this->value_ = value.DoubleValue();
}

Napi::Value CppTrader::ReceiveTrade(const Napi::CallbackInfo& info) {
  this->value_ = this->value_ + 2;
  Napi::Number ts = info[0].As<Napi::Number>();
  Object instruction1 = Object::New(info.Env());
  instruction1.Set("op", "cancelAllOrders");

  Object instruction2 = Object::New(info.Env());
  instruction2.Set("op", "createLimitOrder");
  instruction2.Set("side", 0);
  instruction2.Set("price", 9888);
  instruction2.Set("amountCurrency", 500);
  instruction2.Set("ts", ts);
  Array ret = Array::New(info.Env(), 2);
  ret["0"] = instruction1;
  ret["1"] = instruction2;
  return ret;
}

Napi::Value CppTrader::ReceiveOb(const Napi::CallbackInfo& info) {

  Array ret = Array::New(info.Env(), 1);
  return ret;
}
