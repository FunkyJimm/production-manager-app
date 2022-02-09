import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Container, Table, Row } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';

// TODO
// Edycja => Dodaj reset hasła (dodać nowe pole w użytkowniku resetPassword)
// Dodać uprawnienia

const UsersList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ApiQueries.getItems('users', setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  const handleDetails = id => {
    navigate(`/users/${id}`, { replace: false }, [navigate]);
  }

  const handleEdit = id => {
    navigate(`/users/edit/${id}`, { replace: false }, [navigate]);
  }

  const handleDelete = id => {
    console.log(id)
    ApiQueries.deleteItem('users', id);
    setIsLoaded(false);
  }

  const handleReturn = () => {
    navigate('/', { replace: false }, [navigate]);
  }

  const itemsList = () => {
    return (
      items.data.map((user, index) => (
        <tr key={user.id || user._id}>
          <td>{index + 1}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td><Button onClick={() => handleDetails(user.id || user._id)} variant="outline-primary">Szczegóły</Button></td>
          <td><Button onClick={() => handleEdit(user.id || user._id)} variant="outline-secondary">Edycja</Button></td>
          <td><Button onClick={() => handleDelete(user.id || user._id)} variant="outline-danger">Usuń</Button></td>
        </tr>
      ))
    )
  }

  if (!isLoaded) {
    return (
      <Container fluid>
        <Row>
          { message ? <Alert variant="danger">{message}</Alert> : <p>Wczytywanie...</p> }
        </Row>
        <Row>
          { message && <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button> }
        </Row>
      </Container>
    )
  } else {
    return (
      <Container fluid>
        <Row>
          <h1>Użytkownicy</h1>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nazwa</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {itemsList()}
            </tbody>
          </Table>
        </Row>
        <Row>
          <Button variant="outline-dark" onClick={handleReturn}>Powrót</Button>
        </Row>
      </Container>
    )
  }
}

export default UsersList;