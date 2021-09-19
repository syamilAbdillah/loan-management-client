import React from 'react'

function BaseSelect({ label, options, name, register, schema, errorMsg, isError }){
	return (
		<div className="field">
			<label className="label is-small">{ label }</label>
			<div className="control">
				<div className={options ? 'select': 'select is-loading'}>
					<select {...register(name, schema)}>
						{
							options && 
							options.map((option, index) => (
								<option value={option.id} key={option.id}>
									{ option.name }
								</option>
							))
						}
					</select>
				</div>
				{isError && <p className="help is-danger">{ errorMsg }</p>}
			</div>
		</div>
	)
}

export default BaseSelect