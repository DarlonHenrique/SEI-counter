import { useCosmWasmClient, useSigningCosmWasmClient, useWallet } from '@sei-js/react'
import { useEffect, useState } from 'react'
import { ErrorMessage } from './ErrorMessage'

type CounterProps = {
	contractAddress: string
}

export function Counter({ contractAddress }: CounterProps) {
	const [count, setCount] = useState<number | undefined>()
	const [error, setError] = useState<string>('')
	const [isIncrementing, setIsIncrementing] = useState<boolean>(false)
	const { accounts, connectedWallet } = useWallet()

	// For querying cosmwasm smart contracts
	const { cosmWasmClient } = useCosmWasmClient()

	// For executing messages on cosmwasm smart contracts
	const { signingCosmWasmClient } = useSigningCosmWasmClient()

	const fetchCount = async () => {
		try {
			const response = await cosmWasmClient?.queryContractSmart(contractAddress, { get_count: {} })
			return response?.count
		} catch (error) {
			console.log(error)
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('unknown error')
			}
		}
	}

	useEffect(() => {
		fetchCount().then(setCount)
	}, [fetchCount, connectedWallet])

	const incrementCounter = async () => {
		setIsIncrementing(true)
		try {
			const senderAddress = accounts[0].address

			// Build message content
			const msg = { increment: {} }

			// Define gas price and limit
			const fee = {
				amount: [{ amount: '0.1', denom: 'usei' }],
				gas: '200000'
			}

			// Call smart contract execute msg
			await signingCosmWasmClient?.execute(senderAddress, contractAddress, msg, fee)

			// Updates the counter state again
			fetchCount().then(setCount)
			setIsIncrementing(false)
			setError('')
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			} else {
				setError('unknown error')
			}
			setIsIncrementing(false)
		}
	}

	return (
		<div>
			<h1>Count is: {count ? count : '---'}</h1>
			<button disabled={isIncrementing} onClick={incrementCounter}>
				{isIncrementing ? 'incrementing...' : 'increment'}
			</button>
			{error && <ErrorMessage error={error} />}
		</div>
	)
}
