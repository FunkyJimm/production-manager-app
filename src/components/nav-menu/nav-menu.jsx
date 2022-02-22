import { Button, Nav } from 'react-bootstrap';

import './nav-menu.style.scss';

const NavMenu = ({ setIsLogged }) => {
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("isLogged");
    setIsLogged(false);
    window.location.href = '/';
  }

  const adminMenu = () => {
    if (localStorage.getItem("role") === "admin") {
      return (
        <Nav.Item>
          <Nav.Link className="link" href="/admin">Administracja</Nav.Link>
        </Nav.Item>
      )
    }
  }

  return (
    <div className="nav-menu">
      <div className="nav-menu__block"></div>
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
          {adminMenu()}
        </Nav>
      </div>
      <div className="nav-menu__session">
        <div className="nav-menu__session-panel">
          <p>Zalogowany jako: <b>{localStorage.getItem("userName")}</b></p>
          <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Wyloguj</Button>
        </div>
      </div>
    </div>
  )
}

export default NavMenu;