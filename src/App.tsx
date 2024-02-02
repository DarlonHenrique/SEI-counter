import { SeiWalletProvider } from '@sei-js/react'
import './App.css'
import Home from './Home.tsx'

function App() {
	return (
		<SeiWalletProvider
			chainConfiguration={{
				chainId: 'atlantic-2',
				restUrl: 'https://rest.atlantic-2.seinetwork.io',
				rpcUrl: 'https://rpc.atlantic-2.seinetwork.io'
			}}
			wallets={['compass', 'fin']}
		>
			<Home />
		</SeiWalletProvider>
	)
}

export default App
