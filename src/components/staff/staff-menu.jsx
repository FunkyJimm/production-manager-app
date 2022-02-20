import { useNavigate } from 'react-router-dom';
import { FcBriefcase, FcBusinessman, FcGraduationCap, FcHome, FcLandscape, FcMoneyTransfer, FcViewDetails } from 'react-icons/fc';

import './staff-menu.style.scss';

const StaffMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(`/${endpoint}`, { replace: false }, [navigate]);
  }

  return (
    <div className="staff">
      <div className="staff-menu">
        <div className="staff-menu__box staff-menu__box-employees" onClick={() => handleBox('employees')}>
          <div className="staff-menu__box-icon">
            <FcBusinessman size={100}/>   
          </div>
          <div className="staff-menu__box-desc">
            <h2>Pracownicy</h2>
          </div>
        </div>
        <div className="staff-menu__box staff-menu__box-personal-data" onClick={() => handleBox('personaldata')}>
          <div className="staff-menu__box-icon">
            <FcBriefcase size={100}/>
          </div>
          <div className="staff-menu__box-desc">
            <h2>Dane osobiste</h2>
          </div>
        </div>
        <div className="staff-menu__box staff-menu__box-trainings" onClick={() => handleBox('trainings')}>
          <div className="staff-menu__box-icon">
            <FcGraduationCap size={100}/>
          </div>
          <div className="staff-menu__box-desc">
            <h2>Szkolenia</h2>
          </div>
        </div>
        <div className="staff-menu__box staff-menu__box-insurances" onClick={() => handleBox('insurances')}>
          <div className="staff-menu__box-icon">
            <FcHome size={100}/>
          </div>
          <div className="staff-menu__box-desc">
            <h2>Ubezpieczenia</h2>
          </div>
        </div>
        <div className="staff-menu__box staff-menu__box-contracts" onClick={() => handleBox('contracts')}>
          <div className="staff-menu__box-icon">
            <FcViewDetails size={100}/>
          </div>
          <div className="staff-menu__box-desc">
            <h2>Umowy</h2>
          </div>
        </div>
        <div className="staff-menu__box staff-menu__box-holidays" onClick={() => handleBox('holidays')}>
          <div className="staff-menu__box-icon">
            <FcLandscape size={100}/>
          </div>
          <div className="staff-menu__box-desc">
            <h2>Urlopy</h2>
          </div>
        </div>
        <div className="staff-menu__box staff-menu__box-salaries" onClick={() => handleBox('salaries')}>
          <div className="staff-menu__box-icon">
            <FcMoneyTransfer size={100}/>
          </div>
          <div className="staff-menu__box-desc">
            <h2>Wynagrodzenia</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StaffMenu;