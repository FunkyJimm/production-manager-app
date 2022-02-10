import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';

import ListButtons from '../../commons/list-buttons';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'holidays';

const HolidaysList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ApiQueries.getItems(END_POINT, setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 2000);
    return () => clearTimeout(timer);
  }, [message]);

  const itemsList = () => {
    return (
      items.data.map((holidays, index) => {
        const id = holidays.id || holidays._id;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{holidays.totalVacationsDays}</td>
            <td>{holidays.takenVacationsDays}</td>
            <td>{holidays.takenDuvetDays}</td>
            <td>{holidays.daysOfSickness}</td>
            <td>{holidays.daysOfAbsenceFromWork}</td>
            <ListButtons endpoint={END_POINT} id={id} navigate={navigate} setIsLoaded={setIsLoaded} setMessage={setMessage} />
          </tr>
        )
      })
    )
  }

  if (isLoaded) {
    return (
      <div className="list">
        <Container fluid>
          <Row>
            <h1>Urlopy</h1>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Wszystkie dni urlopu</th>
                  <th>Wybrane dni urlopu</th>
                  <th>Wykorzystane dni urlopu na żądanie</th>
                  <th>Wszystkie dni absencji chorobowej</th>
                  <th>Wszystkie dni obecności nieusprawiedliwionych</th>
                </tr>
              </thead>
              <tbody>
                {itemsList()}
              </tbody>
            </Table>
          </Row>
          <Row>
            <ReturnButton />
          </Row>
          <Row>
            { message && <Alert variant="success">{message}</Alert> }
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

export default HolidaysList;