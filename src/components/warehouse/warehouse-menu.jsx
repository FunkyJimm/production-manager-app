import { useNavigate } from 'react-router-dom';
import { FcPackage, FcShipped } from 'react-icons/fc';

import './warehouse-menu.style.scss';

const WarehouseMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(`/${endpoint}`, { replace: false }, [navigate]);
  }

  return (
    <div className="warehouse">
      <div className="warehouse-menu">
        <div className="warehouse-menu__box warehouse-menu__box-employees" onClick={() => handleBox('products')}>
          <div className="warehouse-menu__box-icon">
            <FcPackage size={100}/>   
          </div>
          <div className="warehouse-menu__box-desc">
            <h2>Produkty</h2>
          </div>
        </div>
        <div className="warehouse-menu__box warehouse-menu__box-personal-data" onClick={() => handleBox('shippings')}>
          <div className="warehouse-menu__box-icon">
            <FcShipped size={100}/>
          </div>
          <div className="warehouse-menu__box-desc">
            <h2>Zamówienia</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarehouseMenu;