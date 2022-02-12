import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'contracts';

const ContractsDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(END_POINT, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { contractType, dateOfConclusion, expirationDate } = data;

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
                <tr>
                  <td>Typ umowy:</td>
                  <td>{contractType}</td>
                </tr>
                <tr>
                  <td>Data zawarcia umowy:</td>
                  <td>{dateOfConclusion}</td>
                </tr>
                <tr>
                  <td>Data zakończenia umowy:</td>
                  <td>{expirationDate}</td>
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

export default ContractsDetails;