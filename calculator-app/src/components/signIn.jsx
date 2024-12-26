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
			setError(getCustomErrorMessage(err.code));
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
		if(!firstName) {
			setError('First name is required.');
			return;
		}
		if(!lastName) {
			setError('Last name is required.');
			return;
		}
		if(!email) {
			setError('Email is required.');
			return;
		}
		if(!validateEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if(!password) {
			setError('Password is required.');
			return;
		}
		if(!validatePassword(password)) {
			setError('Password must be at least 6 characters long.');
			return;
		}
		try {
			await signUpWithEmail(email, password, firstName, lastName);
			setValue('Signed Up');
			localStorage.setItem('email', email);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
		} catch(err) {
			setError(getCustomErrorMessage(err.code));
		}
	};

	const handleSignIn = async () => {
		if(!email) {
			setError('Email is required.');
			return;
		}
		if(!validateEmail(email)) {
			setError('Invalid email format.');
			return;
		}
		if(!password) {
			setError('Password is required.');
			return;
		}
		try {
			await signInWithEmail(email, password);
			setValue('Signed In');
			localStorage.setItem('email', email);
		} catch(err) {
			setError(getCustomErrorMessage(err.code));
		}
	};

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	const validatePassword = (password) => {
		return password.length >= 6;
	};

	const getCustomErrorMessage = (errorCode) => {
		switch(errorCode) {
			case 'auth/email-already-in-use':
				return 'This email is already in use. Please use a different email.';
			case 'auth/invalid-email':
				return 'The email address is not valid. Please enter a valid email.';
			case 'auth/weak-password':
				return 'The password is too weak. Please enter a stronger password.';
			case 'auth/user-not-found':
				return 'No user found with this email. Please check the email and try again.';
			case 'auth/wrong-password':
				return 'Incorrect password. Please try again.';
			default:
				return 'An error occurred. Please try again.';
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
							</button><br />
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
							</button><br />
							<button className="signinBtn" onClick={handleClickPopup}>
								Sign-In with Gmail
							</button><br />
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