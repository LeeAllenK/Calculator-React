import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import SignIn  from './components/signinWithGoogle';
// import LoginForm from './SigninForm/signin.jsx';
// import SignupForm from './SigninForm/signup.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignIn />
  </StrictMode>,
)
