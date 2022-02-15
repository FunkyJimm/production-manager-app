import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const PersonalDataDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.PERSONAL_DATA, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { firstName, secondName, lastName, pesel, parentsNames, dateOfBirth, education, address, phoneNumber, email } = data;
    const { fatherName, motherName } = parentsNames;
    const { street, house, apartment, zipCode, city } = address;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Dane osobowe pracownika</h1>
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
                  <td>Drugie imię:</td>
                  <td>{secondName}</td>
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
                  <td>Imię ojca:</td>
                  <td>{fatherName}</td>
                </tr>
                <tr>
                  <td>Imię matki:</td>
                  <td>{motherName}</td>
                </tr>
                <tr>
                  <td>Data urodzenia:</td>
                  <td>{DateConverters.dateOnlyConverter(dateOfBirth)}</td>
                </tr>
                <tr>
                  <td>Wykształcenie:</td>
                  <td>{education}</td>
                </tr>
                <tr>
                  <td>Ulica:</td>
                  <td>{street}</td>
                </tr>
                <tr>
                  <td>Nr domu:</td>
                  <td>{house}</td>
                </tr>
                <tr>
                  <td>Nr mieszkania:</td>
                  <td>{apartment}</td>
                </tr>
                <tr>
                  <td>Kod pocztowy:</td>
                  <td>{zipCode}</td>
                </tr>
                <tr>
                  <td>Miasto:</td>
                  <td>{city}</td>
                </tr>
                <tr>
                  <td>Nr telefonu:</td>
                  <td>{phoneNumber}</td>
                </tr>
                <tr>
                  <td>Adres email:</td>
                  <td>{email}</td>
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

export default PersonalDataDetails;