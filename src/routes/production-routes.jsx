import { Route } from 'react-router-dom';

import ProductionMenu from '../components/production/production-menu';

import ShiftsDetails from '../components/production/shifts/shifts-details';
import ShiftsForm from '../components/production/shifts/shifts-form';
import ShiftsList from '../components/production/shifts/shifts-list';
import OrdersDetails from '../components/production/orders/orders-details';
import OrdersForm from '../components/production/orders/orders-form';
import OrdersList from '../components/production/orders/orders-list';
import PermitsDetails from '../components/production/permits/permits-details';
import PermitsForm from '../components/production/permits/permits-form';
import PermitsList from '../components/production/permits/permits-list';

const productionRoutes = () => {
  return (
    <>
      <Route path="/production" element={<ProductionMenu />} />

      {/* Shifts */}
      <Route path="shifts" element={<ShiftsList />} />
      <Route path="shifts/:id" element={<ShiftsDetails />} />
      <Route path="shifts/form" element={<ShiftsForm />} />
      <Route path="shifts/form/:id" element={<ShiftsForm />} />

      {/* Orders */}
      <Route path="orders" element={<OrdersList />} />
      <Route path="orders/:id" element={<OrdersDetails />} />
      <Route path="orders/form" element={<OrdersForm />} />
      <Route path="orders/form/:id" element={<OrdersForm />} />

      {/* Permits */}
      <Route path="permits" element={<PermitsList />} />
      <Route path="permits/:id" element={<PermitsDetails />} />
      <Route path="permits/form" element={<PermitsForm />} />
      <Route path="permits/form/:id" element={<PermitsForm />} />
    </>
  )
}

export default productionRoutes;