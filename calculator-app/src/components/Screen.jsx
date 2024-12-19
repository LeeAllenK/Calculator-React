import React from 'react';

export function ScreenView({value , style}){

	return(
		<div
		className='view'
        style={style}
		>
		{value}	
		</div>
	)
}