import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import EmployeeDetails from '../../commons/employee-details';
import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const HolidaysDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.HOLIDAYS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { employeeId, totalVacationsDays, takenVacationsDays, takenDuvetDays, daysOfSickness, daysOfAbsenceFromWork } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły urlopów</h1>
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
                  <td>Wszystkie dni urlopu:</td>
                  <td>{totalVacationsDays}</td>
                </tr>
                <tr>
                  <td>Wybrane dni urlopu:</td>
                  <td>{takenVacationsDays}</td>
                </tr>
                <tr>
                  <td>Wykorzystane dni urlopu na żądanie:</td>
                  <td>{takenDuvetDays}</td>
                </tr>
                <tr>
                  <td>Wszystkie dni absencji chorobowej:</td>
                  <td>{daysOfSickness}</td>
                </tr>
                <tr>
                  <td>Wszystkie dni obecności nieusprawiedliwionych:</td>
                  <td>{daysOfAbsenceFromWork}</td>
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

export default HolidaysDetails;