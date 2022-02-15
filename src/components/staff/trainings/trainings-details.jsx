import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import EmployeeDetails from '../../commons/employee-details';
import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const TrainingsDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.TRAININGS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { employeeId, title, description, dateOfTraining, expirationDate } = data;

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
                  <td>Tytuł:</td>
                  <td>{title}</td>
                </tr>
                <tr>
                  <td>Opis:</td>
                  <td>{description}</td>
                </tr>
                <tr>
                  <td>Data szkolenia:</td>
                  <td>{DateConverters.dateOnlyConverter(dateOfTraining)}</td>
                </tr>
                <tr>
                  <td>Data ważności szkolenia:</td>
                  <td>{DateConverters.dateOnlyConverter(expirationDate)}</td>
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

export default TrainingsDetails;