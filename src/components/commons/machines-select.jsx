import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';

const MachinesSelect = ({ handleChange, values, name = "machineId" }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    ApiQueries.getItems('machines', setItems, setIsLoaded);
  }, [isLoaded]);
  
  if (isLoaded) {
    const { data } = items;
    const machinesList = data.map(machine => (
      <option key={machine.name} value={machine.id || machine._id}>
        {machine.name}
      </option>
    ))

    return (
      <Form.Select 
        name={name}
        onChange={handleChange}
        value={values.machineId}
        defaultChecked={values?.machineId}
        disabled={values?.machineId && true}
      >
        <option value="">Proszę wybrać maszynę</option>
        {machinesList}
      </Form.Select>
    )
  } else {
    return (
      <p>Nie można pobrać listy maszyn.</p>
    )
  }
}

export default MachinesSelect;