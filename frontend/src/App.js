import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, updateCart } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [auth.authenticate])

  useEffect(() => {
    dispatch(updateCart())
  }, [auth.authenticate])


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:slug' element={<ProductListPage />} />
          <Route path='/:productSlug/:productId/p' element={<ProductDetailsPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
