import { Route } from 'react-router-dom';

import MaintenanceMenu from '../components/maintenance/maintenance-menu';

import MachinesDetails from '../components/maintenance/machines/machines-details';
import MachinesForm from '../components/maintenance/machines/machines-form';
import MachinesList from '../components/maintenance/machines/machines-list';
import RaportsDetails from '../components/maintenance/raports/raports-details';
import RaportsForm from '../components/maintenance/raports/raports-form';
import RaportsList from '../components/maintenance/raports/raports-list';

const maintenanceRoutes = () => {
  return (
    <>
      <Route path="maintenance" element={<MaintenanceMenu />} />

      {/* Machines */}
      <Route path="machines" element={<MachinesList />} />
      <Route path="machines/:id" element={<MachinesDetails />} />
      <Route path="machines/form" element={<MachinesForm />} />
      <Route path="machines/form/:id" element={<MachinesForm />} />

      {/* Raports */}
      <Route path="raports" element={<RaportsList />} />
      <Route path="raports/:id" element={<RaportsDetails />} />
      <Route path="raports/form" element={<RaportsForm />} />
      <Route path="raports/form/:id" element={<RaportsForm />} />
    </>
  )
}

export default maintenanceRoutes;