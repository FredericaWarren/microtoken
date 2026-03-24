import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { trackTransaction } from './utils/track'
import './App.css'

const CONTRACT_ADDRESS = '0xa7e1dbbe043a5a97d2594042a478b4b06dedaf7b'
const CLAIM_AMOUNT = '0.001' // 根据合约实际 claimAmount 调整

const ABI = [
  { inputs: [], name: 'claim', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  { inputs: [{ name: '', type: 'address' }], name: 'claimed', outputs: [{ type: 'bool' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: '', type: 'address' }], name: 'balanceOf', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
] as const

function App() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isSuccess } = useWaitForTransactionReceipt({ hash })

  const [hasClaimed, setHasClaimed] = useState(false)

  useEffect(() => {
    if (isSuccess && hash && address) {
      trackTransaction('app-002', 'MicroToken', address, hash)
    }
  }, [isSuccess, hash, address])

  const handleClaim = async () => {
    if (!address) return
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: ABI,
      functionName: 'claim',
    })
  }

  return (
    <div className="container">
      <h1>MicroToken</h1>
      <p>ERC20 极简代币 + 每人一次免费领取少量</p>

      {!isConnected ? (
        <button onClick={() => connect({ connector: connectors[0] })}>连接钱包</button>
      ) : (
        <div>
          <p>地址: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
          <button onClick={() => disconnect()}>断开</button>
          <hr />
          <button onClick={handleClaim} disabled={isPending || hasClaimed}>
            {isPending ? '领取中...' : hasClaimed ? '已领取' : '免费领取 BMT'}
          </button>
          {isSuccess && <p style={{ color: 'green' }}>领取成功！交易哈希: {hash}</p>}
        </div>
      )}
    </div>
  )
}

export default App
