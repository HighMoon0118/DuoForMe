import { Route } from "react-router-dom"
import Main from "./main/Main"
import Detail from "./detail/Detail.js"
import SignUp from './user/SignUp.js'
import MatchingModal from "./MatchingModal"
import UserEditContainer from "./container/UserEditContainer"
import LoginContainer from "./container/LoginContainer"

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ Main } exact={true} />
      <Route path="/detail/:nickname" component={ Detail }/>
      <Route path="/login" component={ LoginContainer }/>
      <Route path="/signup" component={ SignUp }/>
      <Route path="/matching" component={ MatchingModal }/>
      <Route path="/useredit" component={ UserEditContainer } />
    </div>
  );
}

export default App;
