import React, { useState } from "react";
import Header from "./component/header";
import Footer from "./component/footer";
import Body from "./component/body";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
//localStorage.getItem("tokens") || ""
function App(props) {
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("tokens"));

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <Header />
          <Switch>
            <PrivateRoute path="/admin" component={Body} />
            <Route path="/login" component={Login} />
			<Route exac path="/" component={Login}/>
			<Route  component={()=><h1>404 not found</h1>}/>
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
