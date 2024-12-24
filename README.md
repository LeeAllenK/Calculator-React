<div id="header" >
 <h1  class="heading-element" dir="auto">Simple React Calculator <a href="https://fladev-simple-calculator-react.netlify.app/">Vist Here</a> </h1>
  <img src="https://i.imgur.com/EL6MeQP.gif" alt="Calculator">
  A simple calculator that does basic arithmetic.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">How It's Made:</h1>
 Tech used: HTML, CSS, JavaScript , React , Node.js , Vite<br/>
 This is a basic calculator that has the ability to add, subtract, multiply and divide. The UI design was inspired by modern calculators which are used mainly on phones.
  Each value, operation , result and the fontSize are updated using state. Commas are automatically added to improve users experience while using this calculator. 
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Optimizations:</h1>
 Currently this application has multiple event handlers performing tasks so my focus will be to implement useReducer() to consolidate all neccessary state. This app currently doesn't have a login that's my next focus. Then my will shift to a more mobile approach utiltizing React Native.
</div>

<div id="header" >
 <h1 class="heading-element" dir="auto">Installation:</h1>
  
 1. git clone repo.<br/>
2. create project  www.console.firebase.google
3. npm install<br/>
4. npm install dotenv --save in root folder<br/>
5. Create .env file inside root folder
6. Inside .env add text VITE_API_KEY='${API_KEY}'
7. naviagate to components/firebase.jsx add your VITE_API_KEY like so "import.meta.env.VITE.API_KEY"
8. npm run dev
 
</div>

<div id="header">
 <h1 class="heading-element" dir="auto">Lessons Learned:</h1>
 Lessons that were learned was to avoid contradicting state and redundant state. To always keep track of how state is being rendered and to always setState.
 Also take advantage of React's hooks when updating state throughout my applications.
</div>
