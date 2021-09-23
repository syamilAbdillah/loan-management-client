function dateToShortGMT(stringDate){
	const date = new Date(stringDate)
	const gmts = date.toGMTString().split(' ')
	gmts.splice(4)

	return gmts.join(' ')
}

export default dateToShortGMT