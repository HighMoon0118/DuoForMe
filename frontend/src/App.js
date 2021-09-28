import { Route } from "react-router-dom"
import Detail from "./detail/Detail.js"
import SignUp from './user/SignUp.js'
import MatchingModal from "./MatchingModal"
import UserEditContainer from "./container/UserEditContainer"
import LoginContainer from "./container/LoginContainer"
import MainContainer from "./container/MainContainer"

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ MainContainer } exact={true} />
      <Route path="/detail/:nickname" component={ Detail }/>
      <Route path="/login" component={ LoginContainer }/>
      <Route path="/signup" component={ SignUp }/>
      <Route path="/matching" component={ MatchingModal }/>
      <Route path="/useredit" component={ UserEditContainer } />
    </div>
  );
}

export default App;
