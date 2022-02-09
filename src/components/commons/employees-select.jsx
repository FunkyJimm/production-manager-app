import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';

const EmployeesSelect = ({ handleChange, values }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    ApiQueries.getItems('employee', setItems, setIsLoaded);
  }, [isLoaded]);
  
  if (isLoaded) {
    const { data } = items;
    const employeesList = data.map(employee => (
      <option key={employee.pesel} value={employee.id}>
        {`${employee.firstName} ${employee.lastName}; PESEL: ${employee.pesel}`}
      </option>
    ))

    return (
      <Form.Select 
        name="employeeId"
        onChange={handleChange}
        value={values.employeeId}
        defaultChecked={values?.employeeId}
        disabled={values?.employeeId && true}
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