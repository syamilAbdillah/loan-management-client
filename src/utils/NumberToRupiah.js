export default function (number){
	const [stringNumber, fractional] = number.toString().split('.')
	const reverseNumber = stringNumber.split('').reverse()
	
	const temp = reverseNumber.map(function(num, index){
		const isMultiplesOf3 = ((index) % 3) == 0
		if(isMultiplesOf3 && index != 0) return num + '.'

		return num
	})

	const result = temp.reverse().join('')
	
	return fractional ? `Rp. ${result},${fractional}` : `Rp. ${result}`
}