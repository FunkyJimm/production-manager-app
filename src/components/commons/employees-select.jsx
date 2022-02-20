import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';

const EmployeesSelect = ({ handleChange, values, name = "employeeId" }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    ApiQueries.getItems('employees', setItems, setIsLoaded);
  }, [isLoaded]);
  
  if (isLoaded) {
    const { data } = items;
    const employeesList = data.map(employee => (
      <option key={employee.pesel} value={employee.id}>
        {`${employee.firstName} ${employee.lastName}; PESEL: ${employee.pesel}`}
      </option>
    ))

    let typeOfEmployee = '';
    if (name === 'employeeId' && values?.employeeId) {
      typeOfEmployee = values?.employeeId;
    } else if (name === 'managerId' && values?.managerId) {
      typeOfEmployee = values?.managerId;
    } else if (name === 'mechanicId' && values?.mechanicId) {
      typeOfEmployee = values?.mechanicId;
    }

    return (
      <Form.Select 
        name={name}
        onChange={handleChange}
        value={values.typeOfEmployee}
        defaultChecked={values?.typeOfEmployee}
        disabled={values?.typeOfEmployee && true}
      >
        <option value="">Proszę wybrać pracownika</option>
        {employeesList}
      </Form.Select>
    )
  } else {
    return (
      <p>Nie można pobrać listy pracowników.</p>
    )
  }
}

export default EmployeesSelect;