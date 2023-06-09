import { createMsgSend as protoMsgSend } from '@evmos/proto'
import { createMsgSend as eip712MsgSend, MSG_SEND_TYPES } from '@evmos/eip712'
import { createTxMsgSend, TxContext } from '@evmos/transactions'
import { TestingClient } from '../utils'

// TODO: Define a common MsgTestingClient interface with the following methods
// once we can import Protobuf types
class MsgSendTestingClient extends TestingClient {
  get params() {
    const { denom } = this
    const destinationAddress = this.addr2
    const amount = this.amount3

    return {
      destinationAddress,
      amount,
      denom,
    }
  }

  get protoMsg() {
    const { context, params } = this

    return protoMsgSend(
      context.sender.accountAddress,
      params.destinationAddress,
      params.amount,
      params.denom,
    )
  }

  get eip712TypedData() {
    const { context, params } = this

    const types = MSG_SEND_TYPES
    const message = eip712MsgSend(
      params.amount,
      params.denom,
      context.sender.accountAddress,
      params.destinationAddress,
    )

    return {
      types,
      message,
    }
  }

  get payload() {
    const { context, params, protoMsg, eip712TypedData } = this

    const tx = createTxMsgSend(context, params)

    return {
      protoMsg,
      eip712TypedData,
      tx,
    }
  }

  generateTx = (context: TxContext) => {
    const { params } = this
    return createTxMsgSend(context, params)
  }
}

const client = new MsgSendTestingClient()

export default client
