import { Route } from 'react-router-dom';

import StaffMenu from '../components/staff/staff-menu';

import ContractsDetails from '../components/staff/contracts/contracts-details';
import ContractsForm from '../components/staff/contracts/contracts-form';
import ContractsList from '../components/staff/contracts/contracts-list';
import EmployeesDetails from '../components/staff/employees/employees-details';
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

const staffRoutes = () => {
  return (
    <>
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
      <Route path="/personaldata/" element={<PersonalDataList />} />
      <Route path="/personaldata/:id" element={<PersonalDataDetails />} />
      <Route path="/personaldata/form" element={<PersonalDataForm />} />
      <Route path="/personaldata/form/:id" element={<PersonalDataForm />} />

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
    </>
  )
}

export default staffRoutes;