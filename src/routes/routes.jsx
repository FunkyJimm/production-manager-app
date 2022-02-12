import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../App';

import ContractsForm from '../components/staff/contracts/contracts-form';
import ContractsList from '../components/staff/contracts/contracts-list';
import EmployeesForm from '../components/staff/employees/employees-form';
import EmployeesList from '../components/staff/employees/employees-list';
import HolidaysForm from '../components/staff/holidays/holidays-form';
import HolidaysList from '../components/staff/holidays/holidays-list';
import InsurancesForm from '../components/staff/insurances/insurances-form';
import InsurancesList from '../components/staff/insurances/insurances-list';
import PersonalDataForm from '../components/staff/personal-data/personal-data-form';
import PersonalDataList from '../components/staff/personal-data/personal-data-list';
import SalariesForm from '../components/staff/salaries/salaries-form';
import SalariesList from '../components/staff/salaries/salaries-list';
import TrainingsForm from '../components/staff/trainings/trainings-form';
import TrainingsList from '../components/staff/trainings/trainings-list';

import MachinesForm from '../components/production/machines/machines-form';
import OrdersForm from '../components/production/orders/orders-form';
import PermitsForm from '../components/production/permits/permits-form';

import UsersList from '../components/users/users-list';
import UserDetails from '../components/users/user-details';
import UserEdit from '../components/users/user-edit';

import StaffMenu from '../components/staff/staff-menu';

import AsideMenu from '../components/aside-menu/aside-menu';

import './main.scss';
import EmployeesDetails from '../components/staff/employees/employees-details';
import ContractsDetails from '../components/staff/contracts/contracts-details';

const AppRoutes = () => {
  return (
    <div className="main">
      <AsideMenu />
        <BrowserRouter>
        <Routes>
          <Route exact path="/staff" element={<StaffMenu />} />

          {/* Employess */}
          <Route path="staff/employee" element={<EmployeesList />} />
          <Route path="staff/employee/form" element={<EmployeesForm />} />
          <Route path="staff/employee/form/:id" element={<EmployeesForm />} />

          {/* Contracts */}
          <Route path="staff/contracts" element={<ContractsList />} />
          <Route path="staff/contracts/form" element={<ContractsForm />} />
          <Route path="staff/contracts/form/:id" element={<ContractsForm />} />

          {/* Holidays */}
          <Route path="staff/holidays" element={<HolidaysList />} />
          <Route path="staff/holidays/form" element={<HolidaysForm />} />
          <Route path="staff/holidays/form/:id" element={<HolidaysForm />} />

          {/* Insurances */}
          <Route path="staff/insurances" element={<InsurancesList />} />
          <Route path="staff/insurances/form/" element={<InsurancesForm />} />
          <Route path="staff/insurances/form/:id" element={<InsurancesForm />} />

          {/* Personal data */}
          <Route path="staff/personaldata/" element={<PersonalDataList />} />
          <Route path="staff/personaldata/form" element={<PersonalDataForm />} />
          <Route path="staff/personaldata/form/:id" element={<PersonalDataForm />} />

          {/* Salaries data */}
          <Route path="staff/salaries" element={<SalariesList />} />
          <Route path="staff/salaries/form" element={<SalariesForm />} />
          <Route path="staff/salaries/form/:id" element={<SalariesForm />} />

          {/* Trainings data */}
          <Route path="staff/trainings" element={<TrainingsList />} />
          <Route path="staff/trainings/form" element={<TrainingsForm />} />
          <Route path="staff/trainings/form/:id" element={<TrainingsForm />} />

          <Route path="test" element={<ContractsDetails />} />
          <Route path="test/:id" element={<ContractsDetails />} />

          {/* Production */}
          <Route path="machines/form" element={<MachinesForm />} />
          <Route path="machines/form/:id" element={<MachinesForm />} />

          <Route path="orders/form" element={<OrdersForm />} />
          <Route path="orders/form/:id" element={<OrdersForm />} />

          <Route path="permits/form" element={<PermitsForm />} />
          <Route path="permits/form/:id" element={<PermitsForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
  // ZAGNIEŻDZANIE!
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<PersonalDataForm />}>
  //         <Route path=":id" element={<PersonalDataForm />} />
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  // )
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       {/* Main site */}
  //       <Route exact path="/" element={<App />} />

  //       {/* Categories */}
  //       <Route path="/staff" element={<StaffMenu />} />

        // {/* Employess */}
        // <Route path="staff/employee" element={<EmployeesList />} />
        // <Route path="staff/employee/form" element={<EmployeesForm />} />
        // <Route path="staff/employee/form/:id" element={<EmployeesForm />} />

        // {/* Contracts */}
        // <Route path="staff/contracts" element={<ContractsList />} />
        // <Route path="staff/contracts/form" element={<ContractsForm />} />
        // <Route path="staff/contracts/form/:id" element={<ContractsForm />} />

        // {/* Holidays */}
        // <Route path="staff/holidays" element={<HolidaysList />} />
        // <Route path="staff/holidays/form" element={<HolidaysForm />} />
        // <Route path="staff/holidays/form/:id" element={<HolidaysForm />} />

        // {/* Insurances */}
        // <Route path="staff/insurances" element={<InsurancesList />} />
        // <Route path="staff/insurances/form/" element={<InsurancesForm />} />
        // <Route path="staff/insurances/form/:id" element={<InsurancesForm />} />

        // {/* Personal data */}
        // <Route path="staff/personaldata/" element={<PersonalDataList />} />
        // <Route path="staff/personaldata/form" element={<PersonalDataForm />} />
        // <Route path="staff/personaldata/form/:id" element={<PersonalDataForm />} />

        // {/* Salaries data */}
        // <Route path="staff/salaries" element={<SalariesList />} />
        // <Route path="staff/salaries/form" element={<SalariesForm />} />
        // <Route path="staff/salaries/form/:id" element={<SalariesForm />} />

        // {/* Trainings data */}
        // <Route path="staff/trainings" element={<TrainingsList />} />
        // <Route path="staff/trainings/form" element={<TrainingsForm />} />
        // <Route path="staff/trainings/form/:id" element={<TrainingsForm />} />

        // {/* Users */}
        // <Route path="staff/users" element={<UsersList />} />
        // <Route path="staff/users/:id" element={<UserDetails />}/>
        // <Route path="staff/users/edit/:id" element={<UserEdit />}/>
  //     </Routes>
  //   </BrowserRouter>
  // )
}

export default AppRoutes;