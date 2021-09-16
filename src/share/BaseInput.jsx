import React from 'react'

function BaseInput({label, inputType, name, value, handleChange, isError, errorMsg, register, schema}){
	return (
		<div className="field">
			<label className="label is-small">{ label }</label>
			<div className="control">
				<input 
					type={ inputType || 'text'} 
					className={isError ? "input is-danger":"input"}
					name={name}
					{...register(name, schema)}
				/>
				{isError && <p className="help is-danger">{ errorMsg || "something wrong with this field"}</p>}
			</div>
		</div>
	)
}

export default BaseInput