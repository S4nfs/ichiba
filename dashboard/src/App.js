
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth); //get store value

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App; 
