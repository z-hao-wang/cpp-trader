import json
class Trader:

    def __init__(self, initialValue):
        argJson = json.loads(initialValue)
        # save initial values

    def receiveTrade(self, trade, position, orders):
        price = trade[2]
        if position is None:
            return [{
                "op": "cancelAllOrders"
            }, {
                "op": "createLimitOrder",
                "side": "buy",
                "price": price - 5,
                "amountCurrency": 500,
            }, {
                "op": "createLimitOrder",
                "side": "sell",
                "price": price + 5,
                "amountCurrency": 500,
            }]
        else:
            side = "buy" if position.get("side") == "sell" else "sell"
            newPrice = price - 5 if side == "buy" else price + 5
            return [{
                "op": "cancelAllOrders"
            }, {
                "op": "createLimitOrder",
                "side": side,
                "price": newPrice,
                "amountCurrency": position.get("amountCurrency"),
            }]
    #interface OrderBookSchema {
    #   ts: Date; // server timestamp
    #   exchange?: string;
    #   pair?: string;
    #   bids: {r: number, a: number}[];
    #   asks: {r: number, a: number}[];
    # }
    def receiveOb(self, ob, position, orders):
        return []

traderInstance = Trader("{}")
def receiveOb(arg):
    argJson = json.loads(arg)
    position = argJson.get("position")
    orders = argJson["orders"]
    global traderInstance
    ob = argJson["ob"]
    ret = traderInstance.receiveOb(ob, position, orders)
    return json.dumps(ret)

def receiveTrade(arg):
    argJson = json.loads(arg)
    position = argJson.get("position")
    orders = argJson["orders"]
    global traderInstance
    trade = argJson["trade"]
    ret = traderInstance.receiveTrade(trade, position, orders)
    return json.dumps(ret)
