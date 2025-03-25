
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom/cjs/react-router-dom.min'
import './App.css'
import OrderPizza from './components/OrderPizza' 
import Home from './components/Home'
import Success from './components/Success' 
import Menu from './components/Menu'

function App() {
  return (
    <>
    <Router>
   

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
