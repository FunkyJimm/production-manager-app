import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'employee';

const EmployeesDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(END_POINT, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  // handleLinks = (endpoint, id) => {
  //   navigate(`/${endpoint}/${id}`, { replace: false }, [navigate]);
  // }

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { firstName, lastName, pesel } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły pracownika</h1>
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
                  <td>Imię:</td>
                  <td>{firstName}</td>
                </tr>
                <tr>
                  <td>Nazwisko:</td>
                  <td>{lastName}</td>
                </tr>
                <tr>
                  <td>PESEL:</td>
                  <td>{pesel}</td>
                </tr>
                <tr>
                  <td>Dane osobiste:</td>
                  <td>LINK</td>
                </tr>
                <tr>
                  <td>Szkolenia:</td>
                  <td>LINK</td>
                </tr>
                <tr>
                  <td>Ubezpieczenia:</td>
                  <td>LINK</td>
                </tr>
                <tr>
                  <td>Umowy:</td>
                  <td>LINK</td>
                </tr>
                <tr>
                  <td>Urlopy:</td>
                  <td>LINK</td>
                </tr>
                <tr>
                  <td>Wynagrodzenia:</td>
                  <td>LINK</td>
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
      <Loading message={message} />
    )
  }
}

export default EmployeesDetails;