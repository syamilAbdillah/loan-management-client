import React from 'react'

function BaseSelect(props){
	return (
		<div className="field">
			<label className="label is-small">{ props.label }</label>
			<div className="control">
				<div className="select">
					<select 
						name={props.name} 
						value={props.value}
						onChange={props.handleChange}
					>
						<option value={null}  hidden>-- please select --</option>
						{
							props.options.map((option, index) => (
								<option value={option.value} key={index}>
									{ option.name }
								</option>
							))
						}
					</select>
				</div>
				<p className="help">{ props.desc }</p>
			</div>
		</div>
	)
}

export default BaseSelect