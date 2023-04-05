import { Coin } from '../../proto/cosmos/base/coin.js'
import { MsgMintCoins } from '../../proto/cosmos/bank/tx.js'

export function createMsgMintCoins(
  qoeAddress: string,
  amount: string,
  denom: string,
) {
  const value = new Coin({
    denom,
    amount,
  })

  const message = new MsgMintCoins({
    qoeAddress,
    amount: [value],
  })
  return {
    message,
    path: MsgMintCoins.typeName,
  }
}
