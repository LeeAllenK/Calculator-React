import React from 'react'

function Home({children , style}) {

	const Logout = () => {
		localStorage.clear()
		window.location.reload();
	}
	return (
		
			<div className="logout" >
			<button 
			className="logoutBtn" 
			onClick={Logout} 
			style={style}
			>
			{children}
			Logout
			</button>
			</div>
		
	)
}
export default Home;