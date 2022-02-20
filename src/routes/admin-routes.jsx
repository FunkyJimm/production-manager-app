import { Route } from 'react-router-dom';

import AdminMenu from '../components/users/admin-menu';

import UsersDetails from '../components/users/users-details';
import UsersForm from '../components/users/users-form';
import UsersList from '../components/users/users-list';

const adminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={<AdminMenu />} />

      {/* Users */}
      <Route path="/users" element={<UsersList />} />
      <Route path="/users/:id" element={<UsersDetails />} />
      <Route path="/users/form" element={<UsersForm />} />
      <Route path="/users/form/:id" element={<UsersForm />} />
    </>
  )
}

export default adminRoutes;