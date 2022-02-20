import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Table, Row } from 'react-bootstrap';

import Loading from '../../loading/loading';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const ProductsDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.PRODUCTS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(false);
    }
  }, [isLoaded]);

  if (isLoaded) {
    const { data } = items;
    const id = data.id || data._id;
    const { name, description, quantity, price, weight, expirationDate } = data;

    return (
      <div className="details">
        <Container fluid>
          <Row>
            <h1>Szczegóły produktu</h1>
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
                  <td>Opis:</td>
                  <td>{description}</td>
                </tr>
                <tr>
                  <td>Ilość na stanie:</td>
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
                  <td>Data ważności produktu:</td>
                  <td>{DateConverters.dateOnlyConverter(expirationDate)}</td>
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

export default ProductsDetails;