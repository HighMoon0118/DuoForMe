import { Route } from "react-router-dom"
import Main from "./main/Main"
import Detail from "./detail/Detail"

import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './user/Login.js';

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <BrowserRouter>
        <Route path="/login" component={Login} />
      </BrowserRouter>
=======
      <Route path="/" component={ Main } exact={true} />
      <Route path="/detail" component={ Detail }/>
>>>>>>> feature/user-recommend/fe
    </div>
  );
}

export default App;
