import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const EmployeesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.EMPLOYEES, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  const handleDetails = (endpoint, id) => {
    if (id) {
      navigate(`/${endpoint}/${id}`, { replace: false }, [navigate]);
    } else {
      navigate(`/error`, { replace: false }, [navigate]);
    }
  }

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { firstName, lastName, pesel, contractId, personalDataId, salaryId, holidaysId } = data;

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
                  <td><Button onClick={() => handleDetails('personaldatas', personalDataId)}>Zobacz</Button></td>
                </tr>
                <tr>
                  <td>Umowy:</td>
                  <td><Button onClick={() => handleDetails('contracts', contractId)}>Zobacz</Button></td>
                </tr>
                <tr>
                  <td>Urlopy:</td>
                  <td><Button onClick={() => handleDetails('holidays', holidaysId)}>Zobacz</Button></td>
                </tr>
                <tr>
                  <td>Wynagrodzenia:</td>
                  <td><Button onClick={() => handleDetails('salaries', salaryId)}>Zobacz</Button></td>
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