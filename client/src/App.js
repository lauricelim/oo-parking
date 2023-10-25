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
    <div className="App">
      <header className="App-header">
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/parking' element={<Parking />} />
              <Route path='/car' element={<Car />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;
