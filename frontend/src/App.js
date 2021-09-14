import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './user/Login.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
