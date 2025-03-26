
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom/cjs/react-router-dom.min'
import './App.css'
import OrderPizza from './components/OrderPizza' 
import Home from './components/Home'
import Success from './components/Success' 
import Menu from './components/Menu'
import React, { useEffect } from "react";




/*  Her yeni sayfaya geçtiğinde en üstten başlar*/
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}


function App() {
  return (
    <>
    <Router>
    <ScrollToTop /> 


     <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/orderpizza">
         <OrderPizza/>
        </Route>
      
        <Route path="/menu">
          <Menu/>
        </Route>

        <Route path="/success">
          <Success/>
        </Route>
      
      </Switch>
    </Router>
    
    </>
  )
}

export default App
