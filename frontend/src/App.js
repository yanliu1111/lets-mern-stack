import { Route, Routes } from 'react-router-dom'

import DashLayout from './components/DashLayout'
import EditNote from './features/notes/EditNote'
import EditUser from './features/users/EditUser'
import Layout from './components/Layout'
import Login from './features/auth/Login';
import NewNote from './features/notes/NewNote';
import NewUserForm from './features/users/NewUserForm';
import NotesList from './features/notes/NotesList'
import PersistLogin from './features/auth/PersistLogin'
import Prefetch from './features/auth/Prefetch'
import Public from './components/Public'
import { ROLES } from './config/roles'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList'
import Welcome from './features/auth/Welcome'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
      {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

      {/* protected routes */}
        <Route element={<PersistLogin />}>
          {/* RequireAuth is for protecting the routes based on user roles, in case regular user tries to access admin routes using /users */}
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                  <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                </Route>
                
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>{/* End Prefetch */}
          </Route> {/* End of RequireAuth */}
        </Route> {/* End of PertectRoutes */}

      </Route>
    </Routes>
  );
}

export default App;