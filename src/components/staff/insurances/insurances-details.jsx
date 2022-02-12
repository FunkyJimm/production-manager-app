import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';

import ListButtons from '../../commons/list-buttons';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'insurances';

// TODO
// TODO
// TODO
// TODO
// TODO

const InsurancesDetails = () => {
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
      items.data.map((insurances, index) => {
        const id = insurances.id || insurances._id;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{insurances.name}</td>
            <td>{insurances.type}</td>
            <td>{insurances.amount}</td>
            <td>{insurances.dateFrom}</td>
            <td>{insurances.dateTo}</td>
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
            <h1>Ubezpieczenia</h1>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nazwa</th>
                  <th>Typ umowy</th>
                  <th>Kwota ubezpieczenia</th>
                  <th>Data zawarcia umowy</th>
                  <th>Data zakończenia umowy</th>
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

export default InsurancesDetails;