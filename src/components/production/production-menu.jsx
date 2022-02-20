import { useNavigate } from 'react-router-dom';
import { FcClock, FcInspection, FcOvertime } from 'react-icons/fc';

import './production-menu.style.scss';

const ProductionMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(endpoint, { replace: false }, [navigate]);
  }

  return (
    <div className="production">
      <div className="production-menu">
        <div className="production-menu__box production-menu__box-employees" onClick={() => handleBox('permits')}>
          <div className="production-menu__box-icon">
            <FcClock size={100}/>   
          </div>
          <div className="production-menu__box-desc">
            <h2>Przepustki</h2>
          </div>
        </div>
        <div className="production-menu__box production-menu__box-personal-data" onClick={() => handleBox('orders')}>
          <div className="production-menu__box-icon">
            <FcInspection size={100}/>
          </div>
          <div className="production-menu__box-desc">
            <h2>Zlecenia</h2>
          </div>
        </div>
        <div className="production-menu__box production-menu__box-trainings" onClick={() => handleBox('shifts')}>
          <div className="production-menu__box-icon">
            <FcOvertime size={100}/>
          </div>
          <div className="production-menu__box-desc">
            <h2>Zmiany</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductionMenu;