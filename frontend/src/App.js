import './App.css';
import HomePage from './containers/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:slug' element={<ProductListPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
