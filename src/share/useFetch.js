import {useState, useEffect} from 'react'

function useFetch(url, initialOpt = {},skip = false, callbacks = {}){
	const [data, setData] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState()

	function manualFetch(body = {}, localCB = {}){
		const jsonBody = JSON.stringify(body)
		setIsLoading(true)
		const newOpt = initialOpt.method == 'GET' || initialOpt == 'DELETE' ? initialOpt : Object.assign({}, initialOpt, {body: jsonBody})

		fetch(url, newOpt)
			.then(resp => {
				console.log('resp logger',resp)
				if(resp.status != 200) throw new Error(resp.status)
				
				return resp.json()
			})
			.then(data => {
				setData(data)
				callbacks.onSuccess && callbacks.onSuccess()
				localCB.onSuccess && localCB.onSuccess()
			})
			.catch(error => {
				setHasError(true)
				setErrorMessage(error.message)
				callbacks.onError && callbacks.onError()
				localCB.onError && localCB.onError()
			})
			.finally(() => {
				setIsLoading(false)
				callbacks.onFinish && callbacks.onFinish()
				localCB.onFinish && localCB.onFinish()
			})
	}

	useEffect(() => {
		if(!skip) manualFetch({})
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
		manualFetch,
		setData
	}
}

export default useFetch