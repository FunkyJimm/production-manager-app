import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'employees';

const EmployeesForm = () => {
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
    firstName: '',
    lastName: '',
    pesel: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'pracownika') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.firstName) {
              errors.firstName = 'Imię jest wymagane!';
            } else if (values.firstName.length < 2) {
              errors.firstName = 'Imię jest za krótkie!';
            } else if (values.firstName.length > 32) {
              errors.firstName = 'Imię jest za długie!';
            }
            if (!values.lastName) {
              errors.lastName = 'Nazwisko jest wymagane!';
            } else if (values.lastName.length < 2) {
              errors.lastName = 'Nazwisko jest za krótkie!';
            } else if (values.lastName.length > 32) {
              errors.lastName = 'Nazwisko jest za długie!';
            }
            if (!values.pesel) {
              errors.pesel = 'Numer PESEL jest wymagany!';
            } else if (!/^\d{11}$/i.test(values.pesel)) {
              errors.pesel = 'Wprowadzony numer PESEL jest nieprawidłowy!';
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
                <Form.Label>Imię:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="Imię pracownika"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                />
                {<p className="validationError">{errors.firstName && touched.firstName && errors.firstName}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nazwisko:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Nazwisko pracownika"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                />
                {<p className="validationError">{errors.lastName && touched.lastName && errors.lastName}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>PESEL:</Form.Label>
                <Form.Control
                  type="text"
                  name="pesel"
                  placeholder="Wpisz numer PESEL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pesel}
                />
                {<p className="validationError">{errors.pesel && touched.pesel && errors.pesel}</p>}
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

export default EmployeesForm;