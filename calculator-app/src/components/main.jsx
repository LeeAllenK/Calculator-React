import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

const Home = () => {
	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log('User signed out');
			window.location.reload(); // Reload the page to update the authentication state
		} catch(err) {
			console.error('Error signing out:', err);
		}
	};
	return (
		<div className="home">
			<h1>Welcome to the Home Page</h1>
			<button onClick={handleLogout}>Logout</button>
			{/* Your home page content goes here */}
		</div>
	);
};

export default Home;
