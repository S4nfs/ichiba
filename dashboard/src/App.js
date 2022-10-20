
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />       {/* sub-route home */}
          </Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App; 
