import { useState, useEffect } from "react";
import { signInWithGoogleRedirect, signInWithGooglePopup } from './signinWithGoogle';
import { signUpWithEmail } from './signUpWithEmail';
import { signInWithEmail } from './signInWithEmail';
import App from '../App.jsx';
import '../signin-signup.css';

function SignIn() {
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isRegistering, setIsRegistering] = useState(false);

	const handleClickRedirect = async () => {
		try {
			console.log('Redirecting...'); // Debugging line
			await signInWithGoogleRedirect();
			setValue('Signed In');
			localStorage.setItem('email', 'user@example.com'); // Replace with actual user email
		} catch(err) {
			setError(err.message);
		}
	};

	const handleClickPopup = async () => {
		try {
			await signInWithGooglePopup();
			setValue('Signed In');
			localStorage.setItem('email', 'user@example.com'); // Replace with actual user email
		} catch(err) {
			console.log('Popup sign-in failed, falling back to redirect...'); // Debugging line
			handleClickRedirect();
		}
	};

	const handleSignUp = async () => {
		try {
			await signUpWithEmail(email, password, firstName, lastName);
			setValue('Signed Up');
			localStorage.setItem('email', email);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
		} catch(err) {
			setError(err.message);
		}
	};

	const handleSignIn = async () => {
		try {
			await signInWithEmail(email, password);
			setValue('Signed In');
			localStorage.setItem('email', email);
		} catch(err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		setValue(localStorage.getItem('email'));
	}, []);

	useEffect(() => {
		const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
		console.log('Is Mobile:', isMobile); // Debugging line
		if(isMobile && !value) {
			handleClickRedirect();
		}
	}, [value]);

	return (
		<div className='signin-signup'>
			{value ? (
				<App />
			) : (
				<>
					
					{isRegistering ? (
						<div className="email-signup">
							<input
								type="text"
								placeholder="First Name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
							<input
								type="text"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button className="signupBtn" onClick={handleSignUp}>
								Sign-Up with Email
							</button><br/>
							<button className="toggleBtn" onClick={() => setIsRegistering(false)}>
								Already have an account? Sign In
							</button>
						</div>
					) : (
						<div className="email-signin">
							<input
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<input
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button className="signinBtn" onClick={handleSignIn}>
								Sign-In with Email
							</button><br/>
							<button className="signinBtn" onClick={handleClickPopup}>
								Sign-In with Gmail
							</button><br/>
							<button className="toggleBtn" onClick={() => setIsRegistering(true)}>
								Don't have an account? Register
							</button>
						</div>
					)}
					{error && <p className="error">{error}</p>}
				</>
			)}
		</div>
	);
}

export default SignIn;
