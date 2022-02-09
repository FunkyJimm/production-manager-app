import { Button } from 'react-bootstrap';

const Logout = ({ setIsLogged }) => {
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("isLogged");
    setIsLogged(false);
  }

  return (
    <div className="logout__container">
      <p>Zalogowany jako: <b>{localStorage.getItem("userName")}</b></p>
      <Button onClick={handleLogout}>Wyloguj</Button>
    </div>
  )
}

export default Logout;