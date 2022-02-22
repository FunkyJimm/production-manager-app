import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AsideMenu from './components/aside-menu/aside-menu';
import NavMenu from './components/nav-menu/nav-menu';

import Login from './components/session/login';
import RegistrationForm from './components/session/registration-form';

import HomePage from './components/home/home';

import adminRoutes from './routes/admin-routes';
import staffRoutes from './routes/staff-routes';
import productionRoutes from './routes/production-routes';
import maintenanceRoutes from './routes/maintenance-routes';
import warehouseRoutes from './routes/warehouse-routes';

import './App.scss';

const AppRoutes = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      setIsLogged(true);
    }
  }, [isLogged]);

  const userInterface = () => {

    if (isLogged) {
      return (
        <>
          <AsideMenu />
          <div className="container">
            <NavMenu setIsLogged={setIsLogged} />
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<HomePage />} />
                {adminRoutes()}
                {staffRoutes()}
                {productionRoutes()}
                {maintenanceRoutes()}
                {warehouseRoutes()}
              </Routes>
            </BrowserRouter>
          </div>
        </>
      )
    } else {
      return (
        <>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login setIsLogged={setIsLogged} />} />
              <Route path="/registration" element={<RegistrationForm />} />
            </Routes>
          </BrowserRouter>
        </>
      )
    }
  }

  return (
    <div className="main">
      {userInterface()}
    </div>
  )
}

export default AppRoutes;