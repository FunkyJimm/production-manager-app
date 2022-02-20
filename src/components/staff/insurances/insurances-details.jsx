import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import EmployeeDetails from '../../commons/employee-details';
import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const InsurancesDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.INSURANCES, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { employeeId, name, type, amount, dateFrom, dateTo } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły ubezpieczenia</h1>
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
                  <td>Nazwa:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Typ umowy:</td>
                  <td>{type}</td>
                </tr>
                <tr>
                  <td>Kwota ubezpieczenia:</td>
                  <td>{amount}</td>
                </tr>
                <tr>
                  <td>Data zawarcia umowy:</td>
                  <td>{DateConverters.dateOnlyConverter(dateFrom)}</td>
                </tr>
                <tr>
                  <td>Data zakończenia umowy:</td>
                  <td>{DateConverters.dateOnlyConverter(dateTo)}</td>
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

export default InsurancesDetails;