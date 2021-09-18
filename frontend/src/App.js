import { Route } from "react-router-dom"
import Main from "./main/Main"
import Detail from "./detail/Detail.js"
import Login from './user/Login.js'
import SignUp from './user/SignUp.js'
import MatchingModal from "./MatchingModal"

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ Main } exact={true} />
      <Route path="/detail" component={ Detail }/>
      <Route path="/login" component={ Login }/>
      <Route path="/signup" component={ SignUp }/>
      <Route path="/matching" component={ MatchingModal }/>
    </div>
  );
}

export default App;
