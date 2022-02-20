import { useNavigate } from 'react-router-dom';
import { FcContacts } from 'react-icons/fc';

import './admin-menu.style.scss';

const AdminMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(endpoint, { replace: false }, [navigate]);
  }

  return (
    <div className="admin">
      <div className="admin-menu">
        <div className="admin-menu__box admin-menu__box-employees" onClick={() => handleBox('/users')}>
          <div className="admin-menu__box-icon">
            <FcContacts size={100}/>   
          </div>
          <div className="admin-menu__box-desc">
            <h2>Użytkownicy</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMenu;