import { createMsgMintCoins as protoMsgMintCoins } from '@evmos/proto'
import {
  generateTypes,
  createMsgMintCoins,
  MSG_MINT_COINS_TYPES,
} from '@evmos/eip712'
import { createTransactionPayload, TxContext } from '../base.js'

export interface MsgMintCoinsParams {
  amount: string
  denom: string
}

const createEIP712MsgMintCoins = (
  context: TxContext,
  params: MsgMintCoinsParams,
) => {
  const types = generateTypes(MSG_MINT_COINS_TYPES)

  const message = createMsgMintCoins(
    params.amount,
    params.denom,
    context.sender.accountAddress,
  )

  return {
    types,
    message,
  }
}

const createCosmosMsgMintCoins = (
  context: TxContext,
  params: MsgMintCoinsParams,
) => {
  return protoMsgMintCoins(
    context.sender.accountAddress,
    params.amount,
    params.denom,
  )
}

/**
 * Creates a transaction for a MsgMintCoins object.
 *
 * @remarks
 * This method creates a transaction wrapping the Cosmos SDK's
 * {@link https://docs.cosmos.network/main/modules/bank#MsgMintCoins | MsgMintCoins}
 *
 * @param context - Transaction Context
 * @param params - MsgMintCoins Params
 * @returns Transaction with the MsgMintCoins payload
 *
 */
export const createTxMsgMintCoins = (
  context: TxContext,
  params: MsgMintCoinsParams,
) => {
  const typedData = createEIP712MsgMintCoins(context, params)
  const cosmosMsg = createCosmosMsgMintCoins(context, params)

  return createTransactionPayload(context, typedData, cosmosMsg)
}
