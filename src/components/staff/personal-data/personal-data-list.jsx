import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';

import ListButtons from '../../commons/list-buttons';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'personaldata';

const PersonalDataList = () => {
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
      items.data.map((personalData, index) => {
        const id = personalData.id || personalData._id;
        const { firstName, secondName, lastName, pesel, parentsNames, dateOfBirth, education, address, phoneNumber, email } = personalData;
        return (
          <tr key={id}>
            <td>{index + 1}</td>
            <td>{firstName}</td>
            <td>{secondName}</td>
            <td>{lastName}</td>
            <td>{pesel}</td>
            <td>{parentsNames?.fatherName} {parentsNames?.motherName}</td>
            <td>{dateOfBirth}</td>
            <td>{education}</td>
            <td>{address?.street} {address?.house}{address?.apartment && `/${address?.apartment}`}</td>
            <td>{address?.zipCode} {address?.city}</td>
            <td>{phoneNumber}</td>
            <td>{email}</td>
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
            <h1>Dane osobowe</h1>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Imię</th>
                  <th>Drugie imię</th>
                  <th>Nazwisko</th>
                  <th>PESEL</th>
                  <th>Imiona rodziców</th>
                  <th>Data urodzenia</th>
                  <th>Wykształcenie</th>
                  <th>Adres</th>
                  <th>Miasto</th>
                  <th>Nr telefonu</th>
                  <th>Email</th>
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

export default PersonalDataList;