<div id="header" >
 <h1  class="heading-element" dir="auto">Simple React Calculator <a href="https://fladev-simple-calculator-react.netlify.app/">Vist Here</a> </h1>
  <img src="https://i.imgur.com/9e5pe0E.gif" alt="Calculator">
  A simple calculator that does basic arithmetic.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">How It's Made:</h1>
 Tech used: HTML, CSS, JavaScript, React, Vite<br/>
 This is a basic calculator that has the ability to add, subtract, multiply and divide. The UI design was inspired by modern calculators which are used mainly on phones.
  Each value, operation , result and the fontSize are updated using state. Commas are automatically added to improve users experience while using this calculator. 
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Optimizations:</h1>
 Firebase was used to authenicate users, currently the application only can be logged into if the user has a gmail account. Creating multiple forms of login is my next update. Then my will shift to a more mobile approach utiltizing React Native.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Installation:</h1>
  
 1. git clone repo.<br/>
3. npm install<br/>
4. npm install dotenv --save in root folder<br/>
2. create project navigate https://firebase.google.com
5. Create .env file inside root folder
6. Inside .env add text VITE_API_KEY='${API_KEY}'
7. naviagate to components/firebase.jsx add your VITE_API_KEY like so "import.meta.env.VITE.API_KEY"
8. npm run dev
 
</div>

<div id="header">
 <h1 class="heading-element" dir="auto">Lessons Learned:</h1>
 Ensured that state management is clear and consistent to prevent any conflicting or unnecessary state updates. Always keep track of how state is being rendered and ensure that setState. Finally, I took advantage of React's hooks, such as useReducer and useContext, to manage state and pass values efficiently throughout the application.
</div>
