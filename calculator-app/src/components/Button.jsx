import React from 'react';

export function Button({ value, onBtnClick,className, style}) {

	return (

		<button
			className={className}
			onClick={onBtnClick}
			disabled={false}
			style={style}
		>
			{value}
		</button>
	)
}
