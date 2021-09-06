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
					value={value} 
					{...register(name, {...schema})}
				/>
				{isError && <p className="help">{ errorMsg || "something wrong with this field"}</p>}
			</div>
		</div>
	)
}

export default BaseInput