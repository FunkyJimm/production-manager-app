import { Container, Row } from 'react-bootstrap';

import './aside-menu.style.scss';

const AsideMenu = () => {
  return (
    <div className="aside-menu">
      <Container>
        <Row>
          <p>KADRY</p>
        </Row>
        <Row>
          <p>PRODUKCJA</p>
        </Row>
        <Row>
          <p>UTRZYMANIE</p>
        </Row>
        <Row>
          <p>MAGAZYN</p>
        </Row>
      </Container>
    </div>
  )
}

export default AsideMenu;