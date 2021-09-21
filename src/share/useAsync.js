import { useState } from 'react'

function useAsync({ onSuccess, onError, onFinish }){
	const [isLoading, setIsLoading] = useState(false)
	const [data, setData] = useState()
	const [hasError, setHasError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	function callAsync(url, reqOption){
		setIsLoading(true)
		fetch(url, reqOption)
			.then(resp => {
				if(resp.status != 200) throw new error(resp.status)

				const isJSON = resp.headers.get('Content-Type').split(';')[0] == 'application/json'

				return isJSON ? resp.json(): resp.text() 
			})
			.then(data => {
				setData(data)
				if(onSuccess instanceof Function) onSuccess()
			})
			.catch(error => {
				console.log(error)
				setHasError(true)
				setErrorMessage(error.message)
				if(onError instanceof Function) onError()
			})
			.finally(() => {
				setIsLoading(false)
				if(onFinish instanceof Function) onFinish()
			})
	}

	return {
		isLoading,
		data,
		hasError,
		errorMessage,
		callAsync
	}
}

export default useAsync