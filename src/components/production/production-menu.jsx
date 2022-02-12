import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import './staff-menu.style.scss';

const ProductionMenu = () => {
  const navigate = useNavigate()

  const handleBox = endpoint => {
    navigate(endpoint, { replace: false }, [navigate]);
  }

  return (
    <div className="production-menu">
      <Container>
        <Row>
          <Col md={12}>
            <div className="staff-menu__box staff-menu__box-orders" onClick={() => handleBox('orders')}>
              <h2>Zlecenia</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-machines" onClick={() => handleBox('machines')}>
              <h2>Maszyny</h2>
            </div>
          </Col>
          <Col md={6}>
            <div className="staff-menu__box staff-menu__box-permits" onClick={() => handleBox('permits')}>
              <h2>Przepustki</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductionMenu;