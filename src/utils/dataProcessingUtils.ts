import { OrderBookSchema } from 'basic-backtest';
import * as _ from 'lodash';

export function convertObAmountToBtcNotion(ob: OrderBookSchema) {
  _.each(ob.bids, bid => {
    bid.a = bid.a / bid.r;
  });
  _.each(ob.asks, ask => {
    ask.a = ask.a / ask.r;
  });
}
