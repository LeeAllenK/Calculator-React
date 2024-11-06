import React from 'react';

export function Button({ value, onBtnClick, style}) {

	return (

		<button
			className='Btn'
			onClick={onBtnClick}
			disabled={false}
			style={style}
		>
			{value}
		</button>
	)
}
