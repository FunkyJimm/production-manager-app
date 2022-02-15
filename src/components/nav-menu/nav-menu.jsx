import { Nav } from 'react-bootstrap';

import './nav-menu.style.scss';

const NavMenu = () => {
  return (
    <div className="nav-menu">
      <div className="nav-menu__links">
        <Nav>
          <Nav.Item>
            <Nav.Link className="link">Kadry</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="link">Produkcja</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="link">Utrzymanie</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="link">Magazyn</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div className="nav-menu__panel">
        <p>Zalogowano jako: Romek</p>
      </div>
    </div>
  )
}

export default NavMenu;