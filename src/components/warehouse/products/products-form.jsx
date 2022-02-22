import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const ProductsForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.PRODUCTS, id, setItems, setIsLoaded);
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const resetMessages = () => {
    setMessage('');
    setErrMessage('');
  }

  let initialValues = {
    name: '',
    description: '',
    quantity: '',
    price: '',
    weight: '',
    expirationDate: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'produkt') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Nazwa jest wymagana!';
            } else if (values.name.length < 2) {
              errors.name = 'Nazwa jest za krótka!';
            } else if (values.name.length > 32) {
              errors.name = 'Nazwa jest za długa!';
            }
            if (!values.description) {
              errors.description = 'Opis jest wymagany!';
            } else if (values.description.length < 2) {
              errors.description = 'Opis jest za krótki!';
            } else if (values.description.length > 64) {
              errors.description = 'Opis jest za długi!';
            }
            if (values.quantity < 0) {
              errors.quantity = 'Ilość nie może być mniejsza od 0!';
            }
            if (values.price < 0) {
              errors.price = 'Cena nie może być mniejsza od 0!';
            }
            if (values.weight < 0) {
              errors.weight = 'Waga nie może być mniejsza od 0!';
            }
            if (!values.expirationDate && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.expirationDate)) {
              errors.expirationDate = 'Podana data jest nieprawidłowa!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.PRODUCTS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.PRODUCTS, id, values, setMessage, setErrMessage);
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
                <Form.Label>Nazwa:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nazwa zlecenia"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {<p className="validationError">{errors.name && touched.name && errors.name}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Opis:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Opis produktu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {<p className="validationError">{errors.description && touched.description && errors.description}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Podaj ilość na stanie:</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.quantity || 0}
                  min={0}
                  disabled={!id && true}
                />
                {<p className="validationError">{errors.quantity && touched.quantity && errors.quantity}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Podaj cenę za sztukę:</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price || 0}
                  min={0}
                />
                {<p className="validationError">{errors.price && touched.price && errors.price}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Podaj wagę w kg:</Form.Label>
                <Form.Control
                  type="number"
                  name="weight"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.weight || 0}
                  min={0}
                />
                {<p className="validationError">{errors.weight && touched.weight && errors.weight}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data ważności:</Form.Label>
                <Form.Control
                  type="date"
                  name="expirationDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expirationDate ? DateConverters.formDateConverter(values.expirationDate) : values.expirationDate}
                />
                {<p className="validationError">{errors.expirationDate && touched.expirationDate && errors.expirationDate}</p>}
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

export default ProductsForm;