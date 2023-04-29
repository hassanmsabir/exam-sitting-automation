import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Dashboard, Home, Login, Services } from './app/pages';
import { Header, PrivateRoute, PublicRoute } from './app/components';

function App() {
  return (
    <>
      <Header />
      <div className='p-3'>

      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} caseSensitive path='/dashboard' />
          
        </Route>
        
        <Route element={<PublicRoute />}>
          <Route element={<Login />} caseSensitive path='/login' />
        </Route>
          <Route element={<Home />} caseSensitive path='/' />
          <Route element={<Services />} caseSensitive path='/services' />
      </Routes>
      </div>

    </>
  );
}

export default App;
