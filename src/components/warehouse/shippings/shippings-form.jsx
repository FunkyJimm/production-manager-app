import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'shippings';

const ShippingsForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(END_POINT, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const resetMessages = () => {
    setMessage('');
    setErrMessage('');
  }

  let initialValues = {
    orderNumber: '',
    productId: '',
    quantity: '',
    price: '',
    weight: '',
    dateOfOrder: '',
    dateOfShipment: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'wysyłkę') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.orderNumber) {
              errors.name = 'Wpisz numer wysyłki!';
            }
            if (!values.productId) {
              errors.productId = 'Nie wybrano produktu!';
            }
            if (!values.quantity) {
              errors.quantity = 'Podaj wymaganą ilość!';
            }
            if (!values.dateOfOrder) {
              errors.dateOfOrder = 'Data zamówienia jest wymagana!';
            } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateOfOrder)) {
              errors.dateOfOrder = 'Podana data jest nieprawidłowa!';
            }
            if (!values.dateOfShipment) {
              errors.dateOfShipment = 'Data wysyłki jest wymagana!';
            } else if (!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateOfShipment)) {
              errors.dateOfShipment = 'Podana data jest nieprawidłowa!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(END_POINT, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(END_POINT, id, values, setMessage, setErrMessage);
            }
  
            if (!message) {
              setSubmitting(false);
              resetForm();
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Podaj numer wysyłki:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity || 0}
                  min={0}
                />
                {<p className="validationError">{errors.quantity && touched.quantity && errors.quantity}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wybierz produkt:</Form.Label>
                <EmployeesSelect handleChange={handleChange} values={values} name="productId" />
                {<p className="validationError">{errors.productId && touched.productId && errors.productId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Podaj wymaganą ilość:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity || 0}
                  min={0}
                />
                {<p className="validationError">{errors.quantity && touched.quantity && errors.quantity}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Suma zamówienia:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price || 0}
                  min={0}
                  disabled={id && false}
                />
                {<p className="validationError">{errors.price && touched.price && errors.price}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Waga zamówienia:</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.weight || 0}
                  min={0}
                  disabled={id && false}
                />
                {<p className="validationError">{errors.weight && touched.weight && errors.weight}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data zamówienia:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfOrder"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfOrder || ''}
                />
                {<p className="validationError">{errors.dateOfOrder && touched.dateOfOrder && errors.dateOfOrder}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data wysyłki:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfShipment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfShipment || ''}
                />
                {<p className="validationError">{errors.dateOfShipment && touched.dateOfShipment && errors.dateOfShipment}</p>}
              </Form.Group>
              <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zatwierdź</Button>
              <ReturnButton />
            </Form>          
          )}
        </Formik>
  
        { message && <Alert variant="success">{message}</Alert> }
        { errMessage && <Alert variant="danger">{errMessage}</Alert> }
      </div>
    )
  } else {
    return (
      <Loading />
    )
  }
}

export default ShippingsForm;