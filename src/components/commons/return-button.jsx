import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ReturnButton = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate(-1);
  }

  return (
    <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
  )
}

export default ReturnButton;