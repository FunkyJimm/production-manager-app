import { useEffect, useState } from 'react';

import ApiQueries from '../../helpers/api-queries';

const MachineDetails = ({ machineId }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    ApiQueries.getItemDetails('machines', machineId, setItems, setIsLoaded);
  }, [isLoaded]);

  if (isLoaded) {
    const { name, description, state } = items.data; 

    return (
      <>
        <tr>
          <td>Nazwa:</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Opis:</td>
          <td>{description}</td>
        </tr>
        <tr>
          <td>Stan:</td>
          <td>{state ? 'Sprawna' : 'Nie sprawna'}</td>
        </tr>
      </>
    )
  } else {
    return (
      <tr>
        <td colSpan={2}>Nie można pobrać maszyny.</td>
      </tr>
    )
  }
}

export default MachineDetails;