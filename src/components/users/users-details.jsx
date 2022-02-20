import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import Loading from '../loading/loading';
import ReturnButton from '../commons/return-button';

import ApiQueries from '../../helpers/api-queries';

import Config from '../../config/config';

const UsersDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.USERS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { name, email, type } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły użytkownika</h1>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Numer ID:</th>
                  <th>{id}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nazwa:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Adres email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td>Rola:</td>
                  <td>{type}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
          <Row>
            <ReturnButton />
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default UsersDetails;