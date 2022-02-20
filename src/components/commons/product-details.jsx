import { useEffect, useState } from 'react';

import ApiQueries from '../../helpers/api-queries';
import DateConverters from '../../helpers/date-converters';

const ProductDetails = ({ productId }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    ApiQueries.getItemDetails('products', productId, setItems, setIsLoaded);
  }, [isLoaded]);

  if (isLoaded) {
    const { name, expirationDate } = items.data; 

    return (
      <>
        <tr>
          <td>Nazwa:</td>
          <td>{name}</td>
        </tr>
        <tr>
          <td>Data ważności:</td>
          <td>{DateConverters.dateOnlyConverter(expirationDate)}</td>
        </tr>
      </>
    )
  } else {
    return (
      <tr>
        <td colSpan={2}>Nie można pobrać produktu.</td>
      </tr>
    )
  }
}

export default ProductDetails;