import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from '../App';

import ContractsForm from '../components/staff/contracts/contracts-form';
import ContractsList from '../components/staff/contracts/contracts-list';
import EmployeesForm from '../components/staff/employees/employees-form';
import EmployeesList from '../components/staff/employees/employees-list';
import HolidaysForm from '../components/staff/holidays/holidays-form';
import HolidaysList from '../components/staff/holidays/holidays-list';
import InsurancesForm from '../components/staff/insurances/insurances-form';
import PersonalDataForm from '../components/staff/personal-data/personal-data-form';
import PersonalDataList from '../components/staff/personal-data/personal-data-list';
import SalariesForm from '../components/staff/salaries/salaries-form';
import TrainingsForm from '../components/staff/trainings/trainings-form';

import UsersList from '../components/users/users-list';
import UserDetails from '../components/users/user-details';
import UserEdit from '../components/users/user-edit';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main site */}
        <Route exact path="/" element={<App />} />

        {/* Employess */}
        <Route path="/employee" element={<EmployeesList />} />
        <Route path="/employee/form" element={<EmployeesForm />} />
        <Route path="/employee/form/:id" element={<EmployeesForm />} />

        {/* Contracts */}
        <Route path="/contracts" element={<ContractsList />} />
        <Route path="/contracts/form" element={<ContractsForm />} />
        <Route path="/contracts/form/:id" element={<ContractsForm />} />

        {/* Holidays */}
        <Route path="/holidays" element={<HolidaysList />} />
        <Route path="/holidays/form" element={<HolidaysForm />} />
        <Route path="/holidays/form/:id" element={<HolidaysForm />} />

        {/* Insurances */}
        <Route path="/insurances/" element={<InsurancesForm />} />
        <Route path="/insurances/:id" element={<InsurancesForm />} />

        {/* Personal data */}
        <Route path="/personaldata/" element={<PersonalDataList />} />
        <Route path="/personaldata/form" element={<PersonalDataForm />} />
        <Route path="/personaldata/form/:id" element={<PersonalDataForm />} />

        {/* Salaries data */}
        <Route path="/salaries/" element={<SalariesForm />} />
        <Route path="/salaries/:id" element={<SalariesForm />} />

        {/* Trainings data */}
        <Route path="/trainings/" element={<TrainingsForm />} />
        <Route path="/trainings/:id" element={<TrainingsForm />} />

        {/* Users */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" element={<UserDetails />}/>
        <Route path="/users/edit/:id" element={<UserEdit />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;