import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import Parking from './pages/parking';
import Car from './pages/car';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Initialze the client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/parking' element={<Parking />} />
            <Route path='/car' element={<Car />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
