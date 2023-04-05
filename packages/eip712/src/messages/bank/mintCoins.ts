export const MSG_MINT_COINS_TYPES = {
  MsgValue: [
    { name: 'qoe_address', type: 'string' },
    { name: 'amount', type: 'TypeAmount[]' },
  ],
  TypeAmount: [
    { name: 'denom', type: 'string' },
    { name: 'amount', type: 'string' },
  ],
}
export function createMsgMintCoins(
  amount: string,
  denom: string,
  qoeAddress: string,
) {
  return {
    type: 'cosmos-sdk/MsgMintCoins',
    value: {
      amount: [
        {
          amount,
          denom,
        },
      ],
      qoe_address: qoeAddress,
    },
  }
}
