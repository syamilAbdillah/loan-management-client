import React from 'react'

function BaseInput(props){
	return (
		<div className="field">
			<label className="label is-small">{ props.label }</label>
			<div className="control">
				<input 
					type={ props.inputType || 'text'} 
					className="input"
					name={props.name}
					value={props.value} 
					onChange={props.handleChange} 
				/>
				<p className="help">{ props.desc }</p>
			</div>
		</div>
	)
}

export default BaseInput