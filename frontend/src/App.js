import { Route } from "react-router-dom"
import DetailContainer from "./container/DetailContainer.js"
import SignUp from './user/SignUp.js'
import UserEditContainer from "./container/UserEditContainer"
import LoginContainer from "./container/LoginContainer"
import MainContainer from "./container/MainContainer"
import WebSocketContainer from "./container/WebSocketContainer.js"

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ MainContainer } exact={true} />
      <Route path="/detail/:nickname" component={ DetailContainer }/>
      <Route path="/login" component={ LoginContainer }/>
      <Route path="/signup" component={ SignUp }/>
      <Route path="/useredit" component={ UserEditContainer } />
      <WebSocketContainer/>
    </div>
  );
}

export default App;
