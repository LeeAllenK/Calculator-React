import React, { useState, useEffect } from 'react';

export const Clock = () => {
	const [time , setTime] = useState(new Date());
	useEffect(() => {
		const currentTime = setInterval(() => {
			setTime(new Date());
		},1000)
		return () => clearInterval(currentTime);
	}, [])
	return (
		<p style={{color: 'white'}}>{time.toLocaleTimeString()}</p>
	);
};

 
