import React from 'react'
import dateToShortGMT from '../utils/dateToShortGMT'
import formatDate from '../utils/formatDate'

export default function Time({ stringDate }){
	const date = new Date(stringDate)
	const datetime = formatDate(date)
	const shortGMT = dateToShortGMT(date)
	return <time dateTime={datetime}>{ shortGMT }</time>
}