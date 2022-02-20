import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import EmployeeDetails from '../../commons/employee-details';
import ProductDetails from '../../commons/product-details';
import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const ShiftsDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.SHIFTS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { staff, managerId, mechanicId, productId, quantityProduced, waste, workingTime } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły zmiany</h1>
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
                  <td>Nr zmiany:</td>
                  <td>{staff}</td>
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
                  <td>Mechanik:</td>
                  <td>
                    <Table striped bordered hover>
                      <tbody>
                        <EmployeeDetails employeeId={mechanicId} />
                      </tbody>
                    </Table>
                  </td>
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
                  <td>Wyprodukowano:</td>
                  <td>{quantityProduced}</td>
                </tr>
                <tr>
                  <td>Odpad:</td>
                  <td>{waste}</td>
                </tr>
                <tr>
                  <td>Czas pracy:</td>
                  <td>{workingTime}</td>
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

export default ShiftsDetails;