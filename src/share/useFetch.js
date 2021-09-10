import {useState, useEffect} from 'react'

function useFetch(url, initialOpt = {},skip = false, callbacks = {}){
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState()

	function manualFetch(body = {}){
		const jsonBody = JSON.stringify(body)
		setIsLoading(true)
		const newOpt = Object.assign({}, initialOpt, {body: jsonBody})

		console.log('newOpt', newOpt)
		fetch(url, newOpt)
			.then(resp => {
				console.log('resp logger',resp)
				if(resp.status != 200) throw new Error(resp.status)
				
				return resp.json()
			})
			.then(data => {
				setData(data)
				callbacks?.onSuccess()
			})
			.catch(error => {
				setHasError(true)
				setErrorMessage(error.message)
				console.log('error logger', {error})
			})
			.finally(() => setIsLoading(false))
	}

	useEffect(() => {
		if(!skip) manualFetch()
	}, [])

	//logger 
	useEffect(() => {
		console.log('data logger',data)
	}, [data])

	return {
		data, 
		isLoading, 
		hasError,
		errorMessage, 
		manualFetch
	}
}

export default useFetch