import './App.css';
import LoginComponent from './pages/login-page/login.component';
import {Route, Routes } from 'react-router-dom';
import CaringEmployeeComponent from './pages/caring-employee-page/caring-employee.component';
import OfficeEmployeeComponent from './pages/office-employee-page/office-employee.component';
import VetEmployeeComponent from './pages/vet-employee-page/vet-employee.component';
import PageNotFoundComponent from './pages/page-not-found/page-not-found.component';
import PrivateRoute from './services/private-route';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<LoginComponent/>} />  {}
          <Route 
            path="/caring" 
            element={
              <PrivateRoute>              
                <CaringEmployeeComponent/>
              </PrivateRoute>} />  {}
          
          <Route 
            path="/vet" 
            element={
              <PrivateRoute>              
                <VetEmployeeComponent/>
              </PrivateRoute>} />  {}
          
          <Route 
            path="/office/*" 
            element={
              <PrivateRoute>              
                <OfficeEmployeeComponent/>
              </PrivateRoute>} />  {}
          <Route path="*" element={<PageNotFoundComponent/>} />  {}
      </Routes>
    </div>
  );
}

export default App;
