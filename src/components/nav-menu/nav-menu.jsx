import { useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

import './nav-menu.style.scss';

const NavMenu = () => {

  return (
    <div className="nav-menu">
      <div className="nav-menu__links">
        <Nav>
          <Nav.Item>
            <Nav.Link className="link" href="/staff">Kadry</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="link" href="/production">Produkcja</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="link" href="/maintenance">Utrzymanie</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="link" href="/warehouse">Magazyn</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  )
}

export default NavMenu;