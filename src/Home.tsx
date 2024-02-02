import { WalletConnectButton, useWallet } from '@sei-js/react'
import { Counter } from './components/Counter'

const CONTRACT_ADDRESS = 'sei18g4g35mhy5s88nshpa6flvpj9ex6u88l6mhjmzjchnrfa7xr00js0gswru'

function Home() {
	const { connectedWallet } = useWallet()
	return connectedWallet ? <Counter contractAddress={CONTRACT_ADDRESS} /> : <WalletConnectButton />
}

export default Home
