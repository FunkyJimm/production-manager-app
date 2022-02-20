import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';

const ProductsSelect = ({ handleChange, values, name = "productId" }) => {
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    ApiQueries.getItems('products', setItems, setIsLoaded);
  }, [isLoaded]);
  
  if (isLoaded) {
    const { data } = items;
    const productsList = data.map(product => (
      <option key={product.name} value={product.id || product._id}>
        {product.name}
      </option>
    ))

    return (
      <Form.Select 
        name={name}
        onChange={handleChange}
        value={values.productId}
        defaultChecked={values?.productId}
        disabled={values?.productId && true}
      >
        <option value="">Proszę wybrać produkt</option>
        {productsList}
      </Form.Select>
    )
  } else {
    return (
      <p>Nie można pobrać listy produktów.</p>
    )
  }
}

export default ProductsSelect;