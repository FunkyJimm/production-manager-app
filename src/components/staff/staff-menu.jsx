import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import './staff-menu.style.scss';

const StaffMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(`/${endpoint}`, { replace: false }, [navigate]);
  }

  return (
    <div className="staff-menu">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="staff-menu__box staff-menu__box-employees" onClick={() => handleBox('employees')}>
              <h2>Pracownicy</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-personal-data" onClick={() => handleBox('personaldata')}>
              <h2>Dane osobiste</h2>
            </div>
          </Col>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-trainings" onClick={() => handleBox('trainings')}>
              <h2>Szkolenia</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-insurances" onClick={() => handleBox('insurances')}>
              <h2>Ubezpieczenia</h2>
            </div>
          </Col>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-contracts" onClick={() => handleBox('contracts')}>
              <h2>Umowy</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-holidays" onClick={() => handleBox('holidays')}>
              <h2>Urlopy</h2>
            </div>
          </Col>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-salaries" onClick={() => handleBox('salaries')}>
              <h2>Wynagrodzenia</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default StaffMenu;