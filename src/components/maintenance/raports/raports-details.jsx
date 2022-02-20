import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import MachineDetails from '../../commons/machine-details';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const RaportsDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.RAPORTS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { machineId, name, description, breakdownDate, timeOfBreakdown, isFixed } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły raportu</h1>
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
                <MachineDetails machineId={machineId} />
                <tr>
                  <td>Nazwa:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Opis:</td>
                  <td>{description}</td>
                </tr>
                <tr>
                  <td>Data awarii:</td>
                  <td>{DateConverters.dateOnlyConverter(breakdownDate)}</td>
                </tr>
                <tr>
                  <td>Czas awarii:</td>
                  <td>{timeOfBreakdown}</td>
                </tr>
                <tr>
                  <td>Stan maszyny po naprawie:</td>
                  <td>{isFixed ? 'Naprawiona' : 'Nie naprawiona'}</td>
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

export default RaportsDetails;