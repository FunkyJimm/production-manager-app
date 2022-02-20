import { Route } from 'react-router-dom';

import WarehouseMenu from '../components/warehouse/warehouse-menu';

import ProductsDetails from '../components/warehouse/products/products-details';
import ProductsForm from '../components/warehouse/products/products-form';
import ProductsList from '../components/warehouse/products/products-list';
import ShippingsDetails from '../components/warehouse/shippings/shippings-details';
import ShippingsForm from '../components/warehouse/shippings/shippings-form';
import ShippingsList from '../components/warehouse/shippings/shippings-list';

const warehouseRoutes = () => {
  return (
    <>
      <Route path="warehouse" element={<WarehouseMenu />} />

      {/* Products */}
      <Route path="products" element={<ProductsList />} />
      <Route path="products/:id" element={<ProductsDetails />} />
      <Route path="products/form" element={<ProductsForm />} />
      <Route path="products/form/:id" element={<ProductsForm />} />

      {/* Shippings */}
      <Route path="shippings" element={<ShippingsList />} />
      <Route path="shippings/:id" element={<ShippingsDetails />} />
      <Route path="shippings/form" element={<ShippingsForm />} />
      <Route path="shippings/form/:id" element={<ShippingsForm />} />
    </>
  )
}

export default warehouseRoutes;