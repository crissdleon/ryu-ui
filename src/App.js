import React from 'react';
import Header from './component/header'
import Footer from './component/footer'
import Body from './component/body'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"


function App() {
  return (
    <div>	
	<Router>
	<Header />
	<Body /> 
	  <Switch>
		<Route exact path="/">
			<h1>home</h1>
		</Route>

		<Route exact path="/about">
			<h1>about</h1>
		</ Route>
		

	  </Switch>
	</Router> 
	<Footer /> 	
    </div>
  );
}

export default App;
