import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import ProductDetails from '../../commons/product-details';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const ShippingDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.SHIPPINGS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { orderNumber, productId, quantity, price, weight, dateOfOrder, dateOfShipment } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły wysyłki</h1>
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
                  <td>Nr wysyłki:</td>
                  <td>{orderNumber}</td>
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
                  <td>Cena:</td>
                  <td>{price}</td>
                </tr>
                <tr>
                  <td>Waga:</td>
                  <td>{weight}</td>
                </tr>
                <tr>
                  <td>Data zamówienia:</td>
                  <td>{DateConverters.dateOnlyConverter(dateOfOrder)}</td>
                </tr>
                <tr>
                  <td>Data wysyłki:</td>
                  <td>{DateConverters.dateOnlyConverter(dateOfShipment)}</td>
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

export default ShippingDetails;