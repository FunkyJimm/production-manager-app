import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';
import config from '../../config/config';

const UserEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`${config.API_URL}/users/${id}`)
      .then(res => {
        setItems(res.data);
        setIsLoaded(true);
      })
    }
  }, [id]);

  const handleResetPassword = () => {
    console.log(1);
    // TODO

  }

  const handleAssignEmployee = () => {
    console.log(2);

  }

  const handleChangePrivileges = () => {
    console.log(3);

  }

  const handleDeleteUser = () => {
    console.log(4);
    ApiQueries.deleteItem('users', id);
    setIsLoaded(false);
    navigate(-1);
  }

  const handleReturn = () => {
    navigate(-1);
  }

  if (!isLoaded) {
    return (
      <Container fluid>
        <Row>
          <Alert variant="danger">Błąd!</Alert>
        </Row>
        <Row>
          <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
        </Row>
      </Container>
    )
  } else {
    const { data } = items;
    const { name, email } = data;

    return (
      <Container fluid>
        <Row>
          <h1>{ name }</h1>
          <h2>{ email }</h2>
        </Row>
        <Row>
          <Col className="d-grid">
            <Button size="lg" onClick={handleResetPassword}>Resetuj hasło</Button>
          </Col>
          <Col className="d-grid">
            <Button size="lg" onClick={handleAssignEmployee}>Przydziel pracownika</Button>
          </Col>
        </Row>
        <Row>
          <Col className="d-grid">
            <Button size="lg" onClick={handleChangePrivileges}>Zmień uprawnienia</Button>
          </Col>
          <Col className="d-grid">
            <Button size="lg" onClick={handleDeleteUser}>Usuń użytkownika</Button>
          </Col>
        </Row>
        <Row>
          <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
        </Row>
      </Container>
    )
  } 
}

export default UserEdit;