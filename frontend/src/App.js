import { Route } from "react-router-dom"
import Main from "./main/Main"
import Detail from "./detail/Detail"

import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={ Main } exact={true} />
      <Route path="/detail" component={ Detail }/>
    </div>
  );
}

export default App;
