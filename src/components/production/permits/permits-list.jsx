import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';

import ListButtons from '../../commons/list-buttons';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const PermitsList = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ApiQueries.getItems(Config.PERMITS, setItems, setIsLoaded, setMessage);
  }, [isLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('')
    }, 2000);
    return () => clearTimeout(timer);
  }, [message]);

  const itemsList = () => {
    return (
      items.data.map((permit, index) => {
        const id = permit.id || permit._id;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{permit.exitTime}</td>
            <td>{permit.returnTime}</td>
            <ListButtons endpoint={Config.PERMITS} id={id} navigate={navigate} setIsLoaded={setIsLoaded} setMessage={setMessage} />
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
            <h1>Przepustki</h1>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Godzina wyjścia</th>
                  <th>Godzina powrotu</th>
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

export default PermitsList;