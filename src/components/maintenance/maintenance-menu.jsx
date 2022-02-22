import { useNavigate } from 'react-router-dom';
import { FcAutomotive, FcFilingCabinet } from 'react-icons/fc';

import './maintenance-menu.style.scss';

const MaintenanceMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(`/${endpoint}`, { replace: false }, [navigate]);
  }

  return (
    <div className="maintenance">
      <div className="maintenance-menu">
        <div className="maintenance-menu__box maintenance-menu__box-employees" onClick={() => handleBox('machines')}>
          <div className="maintenance-menu__box-icon">
            <FcAutomotive size={100}/>   
          </div>
          <div className="maintenance-menu__box-desc">
            <h2>Maszyny</h2>
          </div>
        </div>
        <div className="maintenance-menu__box maintenance-menu__box-personal-data" onClick={() => handleBox('raports')}>
          <div className="maintenance-menu__box-icon">
            <FcFilingCabinet size={100}/>
          </div>
          <div className="maintenance-menu__box-desc">
            <h2>Raporty</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceMenu;