import React from 'react';

export function ScreenView({value}){

	return(
		<div
		className='view'
        style={{ color: 'white', fontSize: 70, fontWeight: 'bolder', backgroundColor: 'black' }}
		>
		{value}	
		</div>
	)
}