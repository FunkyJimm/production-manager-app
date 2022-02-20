import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import EmployeeDetails from '../../commons/employee-details';
import Loading from '../../loading/loading';
import ProductDetails from '../../commons/product-details';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const OrdersDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.ORDERS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { name, productId, quantity, managerId, shift, status, publicationDate, executionDate } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły zlecenia</h1>
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
                  <td>Nazwa:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td>Produkt:</td>
                  <td>
                    <Table striped bordered hover>
                      <tbody>
                        <ProductDetails productId={productId} />
                      </tbody>
                    </Table>
                  </td>
                </tr>
                <tr>
                  <td>Ilość:</td>
                  <td>{quantity}</td>
                </tr>
                <tr>
                  <td>Brygadzista:</td>
                  <td>
                    <Table striped bordered hover>
                      <tbody>
                        <EmployeeDetails employeeId={managerId} />
                      </tbody>
                    </Table>
                  </td>
                </tr>
                <tr>
                  <td>Zmiana:</td>
                  <td>{shift}</td>
                </tr>
                <tr>
                  <td>Status realizacji:</td>
                  <td>{status ? 'Aktualne' : 'Zrealizowane'}</td>
                </tr>
                <tr>
                  <td>Data zlecenia:</td>
                  <td>{DateConverters.dateOnlyConverter(publicationDate)}</td>
                </tr>
                <tr>
                  <td>Data realizacji:</td>
                  <td>{DateConverters.dateOnlyConverter(executionDate)}</td>
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

export default OrdersDetails;