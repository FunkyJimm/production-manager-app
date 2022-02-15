import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookieProvider } from 'react-cookie';

import App from '../App';

import ContractsDetails from '../components/staff/contracts/contracts-details';
import ContractsForm from '../components/staff/contracts/contracts-form';
import ContractsList from '../components/staff/contracts/contracts-list';
import EmployeesForm from '../components/staff/employees/employees-form';
import EmployeesList from '../components/staff/employees/employees-list';
import HolidaysDetails from '../components/staff/holidays/holidays-details';
import HolidaysForm from '../components/staff/holidays/holidays-form';
import HolidaysList from '../components/staff/holidays/holidays-list';
import InsurancesDetails from '../components/staff/insurances/insurances-details';
import InsurancesForm from '../components/staff/insurances/insurances-form';
import InsurancesList from '../components/staff/insurances/insurances-list';
import PersonalDataDetails from '../components/staff/personal-data/personal-data-details';
import PersonalDataForm from '../components/staff/personal-data/personal-data-form';
import PersonalDataList from '../components/staff/personal-data/personal-data-list';
import SalariesDetails from '../components/staff/salaries/salaries-details';
import SalariesForm from '../components/staff/salaries/salaries-form';
import SalariesList from '../components/staff/salaries/salaries-list';
import TrainingsDetails from '../components/staff/trainings/trainings-details';
import TrainingsForm from '../components/staff/trainings/trainings-form';
import TrainingsList from '../components/staff/trainings/trainings-list';

import MachinesForm from '../components/production/machines/machines-form';
import OrdersForm from '../components/production/orders/orders-form';
import PermitsForm from '../components/production/permits/permits-form';

import ServicesForm from '../components/maintenance/machines/machines-form';
import RaportsForm from '../components/maintenance/raports/raports-form';

import ProductsForm from '../components/warehouse/products/products-form';
import ShippingsForm from '../components/warehouse/shippings/shippings-form';

import UsersList from '../components/users/users-list';
import UserDetails from '../components/users/user-details';
import UserEdit from '../components/users/user-edit';

import ProductionMenu from '../components/production/production-menu';
import StaffMenu from '../components/staff/staff-menu';

import AsideMenu from '../components/aside-menu/aside-menu';
import NavMenu from '../components/nav-menu/nav-menu';

import EmployeesDetails from '../components/staff/employees/employees-details';

import Login from '../components/session/login';

import ErrorPage from '../components/commons/error-page';

import './main.scss';

const AppRoutes = () => {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="main">
      <AsideMenu />
      <div className="container">
        <NavMenu />
          <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login setIsLogged={setIsLogged} />} />

            <Route path="/staff" element={<StaffMenu />} />

            {/* Employess */}
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/employees/:id" element={<EmployeesDetails />} />
            <Route path="/employees/form" element={<EmployeesForm />} />
            <Route path="/employees/form/:id" element={<EmployeesForm />} />

            {/* Contracts */}
            <Route path="/contracts" element={<ContractsList />} />
            <Route path="/contracts/:id" element={<ContractsDetails />} />
            <Route path="/contracts/form" element={<ContractsForm />} />
            <Route path="/contracts/form/:id" element={<ContractsForm />} />

            {/* Holidays */}
            <Route path="/holidays" element={<HolidaysList />} />
            <Route path="/holidays/:id" element={<HolidaysDetails />} />
            <Route path="/holidays/form" element={<HolidaysForm />} />
            <Route path="/holidays/form/:id" element={<HolidaysForm />} />

            {/* Insurances */}
            <Route path="/insurances" element={<InsurancesList />} />
            <Route path="/insurances/:id" element={<InsurancesDetails />} />
            <Route path="/insurances/form/" element={<InsurancesForm />} />
            <Route path="/insurances/form/:id" element={<InsurancesForm />} />

            {/* Personal data */}
            <Route path="/personaldatas/" element={<PersonalDataList />} />
            <Route path="/personaldatas/:id" element={<PersonalDataDetails />} />
            <Route path="/personaldatas/form" element={<PersonalDataForm />} />
            <Route path="/personaldatas/form/:id" element={<PersonalDataForm />} />

            {/* Salaries data */}
            <Route path="/salaries" element={<SalariesList />} />
            <Route path="/salaries/:id" element={<SalariesDetails />} />
            <Route path="/salaries/form" element={<SalariesForm />} />
            <Route path="/salaries/form/:id" element={<SalariesForm />} />

            {/* Trainings data */}
            <Route path="/trainings" element={<TrainingsList />} />
            <Route path="/trainings/:id" element={<TrainingsDetails />} />
            <Route path="/trainings/form" element={<TrainingsForm />} />
            <Route path="/trainings/form/:id" element={<TrainingsForm />} />

            <Route path="test" element={<ContractsDetails />} />
            <Route path="test/:id" element={<ContractsDetails />} />

            {/* Production */}
            <Route path="/production" element={<ProductionMenu />} />
            
            <Route path="shifts/form" element={<MachinesForm />} />
            <Route path="shifts/form/:id" element={<MachinesForm />} />

            <Route path="orders/form" element={<OrdersForm />} />
            <Route path="orders/form/:id" element={<OrdersForm />} />

            <Route path="permits/form" element={<PermitsForm />} />
            <Route path="permits/form/:id" element={<PermitsForm />} />

            {/* Maintenance */}
            <Route path="machines/form" element={<ServicesForm />} />
            <Route path="machines/form/:id" element={<ServicesForm />} />

            <Route path="raports/form" element={<RaportsForm />} />
            <Route path="raports/form/:id" element={<RaportsForm />} />

            {/* Warehouse */}
            <Route path="products/form" element={<ProductsForm />} />
            <Route path="products/form/:id" element={<ProductsForm />} />

            <Route path="shippings/form" element={<ShippingsForm />} />
            <Route path="shippings/form/:id" element={<ShippingsForm />} />

            <Route path="error" element={<ErrorPage />} />

          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </div>
  )
}

export default AppRoutes;