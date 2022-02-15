import { useEffect, useState } from 'react';

import ApiQueries from '../../helpers/api-queries';

const EmployeeDetails = ({ employeeId }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    console.log(employeeId)
    ApiQueries.getItemDetails('employees', employeeId, setItems, setIsLoaded);
  }, [isLoaded]);

  if (isLoaded) {
    const { firstName, lastName, pesel } = items.data; 

    return (
      <>
        <tr>
          <td>Imię:</td>
          <td>{firstName}</td>
        </tr>
        <tr>
          <td>Nazwisko:</td>
          <td>{lastName}</td>
        </tr>
        <tr>
          <td>PESEL:</td>
          <td>{pesel}</td>
        </tr>
      </>
    )
  } else {
    return (
      <tr>
        <td colSpan={2}>Nie można pobrać pracownika.</td>
      </tr>
    )
  }
}

export default EmployeeDetails;