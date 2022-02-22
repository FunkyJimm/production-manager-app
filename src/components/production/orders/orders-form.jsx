import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import ProductsSelect from '../../commons/products-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const OrdersForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.ORDERS, id, setItems, setIsLoaded);
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
    productId: '',
    quantity: '',
    managerId: '',
    shift: '',
    status: true,
    publicationDate: '',
    executionDate: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'zlecenie produkcji') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Nazwa jest wymagana!';
            } else if (values.name.length < 2) {
              errors.name = 'Nazwa jest za krótka!';
            } else if (values.name.length > 128) {
              errors.name = 'Nazwa jest za długa!';
            }
            if (!values.productId) {
              errors.productId = 'Nie wybrano produktu!';
            }
            if (!values.quantity) {
              errors.quantity = 'Podaj wymaganą ilość!';
            }
            if (!values.managerId) {
              errors.managerId = 'Nie wybrano brygadzisty!';
            }
            if (!values.mechanicId) {
              errors.mechanicId = 'Nie wybrano mechanika!';
            }
            if (!values.shift) {
              errors.shift = 'Podaj zmianę!';
            }
            if (!values.publicationDate) {
              errors.publicationDate = 'Data wystawienia zlecenia jest wymagana!';
            } else if (!values.publicationDate && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.publicationDate)) {
              errors.publicationDate = 'Podana data jest nieprawidłowa!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.ORDERS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.ORDERS, id, values, setMessage, setErrMessage);
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
                <Form.Label>Wybierz produkt:</Form.Label>
                <ProductsSelect handleChange={handleChange} values={values} name="productId" />
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
                <Form.Label>Wybierz brygadzistę:</Form.Label>
                <EmployeesSelect handleChange={handleChange} value={values.managerId} name="managerId" />
                {<p className="validationError">{errors.managerId && touched.managerId && errors.managerId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Podaj numer zmiany:</Form.Label>
                <Form.Select 
                  name="shift"
                  onChange={handleChange}
                  value={values.shift}
                  defaultChecked={values?.shift}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Select>
                {<p className="validationError">{errors.shift && touched.shift && errors.shift}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data zlecenia:</Form.Label>
                <Form.Control
                  type="date"
                  name="publicationDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.publicationDate ? DateConverters.formDateConverter(values.publicationDate) : values.publicationDate}
                />
                {<p className="validationError">{errors.publicationDate && touched.publicationDate && errors.publicationDate}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data realizacji:</Form.Label>
                <Form.Control
                  type="date"
                  name="executionDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.executionDate ? DateConverters.formDateConverter(values.executionDate) : values.executionDate}
                  disabled={!id && true}
                />
                {<p className="validationError">{errors.executionDate && touched.executionDate && errors.executionDate}</p>}
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

export default OrdersForm;