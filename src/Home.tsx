import { WalletConnectButton, useWallet } from '@sei-js/react'
import { Counter } from './components/Counter'

const CONTRACT_ADDRESS = 'sei1jq8alrs0f4sq9sj4sj2m037jaf299dyfuhq7sezwsc2kejfvc9dqmcgxs4'

function Home() {
	const { connectedWallet } = useWallet()
	return connectedWallet ? <Counter contractAddress={CONTRACT_ADDRESS} /> : <WalletConnectButton />
}

export default Home
