import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import EmployeeDetails from '../../commons/employee-details';
import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const SalariesDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.SALARIES, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { employeeId, basic, bonus, accessories } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły umowy</h1>
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
                <EmployeeDetails employeeId={employeeId} />
                <tr>
                  <td>Wynagrodzenie podstawowe:</td>
                  <td>{basic}</td>
                </tr>
                <tr>
                  <td>Premia:</td>
                  <td>{bonus}</td>
                </tr>
                <tr>
                  <td>Wynagrodzenie dodatkowe:</td>
                  <td>{accessories}</td>
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

export default SalariesDetails;