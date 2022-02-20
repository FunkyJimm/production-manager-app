import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookieProvider } from 'react-cookie';

import App from '../App';

import AsideMenu from '../components/aside-menu/aside-menu';
import NavMenu from '../components/nav-menu/nav-menu';

import Login from '../components/session/login';
import RegistrationForm from '../components/session/registration-form';

import adminRoutes from './admin-routes';
import staffRoutes from './staff-routes';
import productionRoutes from './production-routes';
import maintenanceRoutes from './maintenance-routes';
import warehouseRoutes from './warehouse-routes';

import './main.style.scss';

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
            <NavMenu />
            <BrowserRouter>
              <Routes>
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