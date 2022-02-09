import { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Form, Button } from 'react-bootstrap';

import ApiQueries from '../../helpers/api-queries';

const Registration = () => {
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  return (
    <div className='registration-form'>
      <h1>Rejestracja użytkownika</h1>
      <Formik 
        initialValues={{
          name: '',
          password: '',
          email: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Nazwa jest wymagana!';
          } else if (values.name.length < 2) {
            errors.name = 'Nazwa jest za krótka!';
          } else if (values.name.length > 32) {
            errors.name = 'Nazwa jest za długa!';
          }
          if (!values.password) {
            errors.password = 'Hasło jest wymagane!';
          } else if (values.password.length < 6) {
            errors.password = 'Hasło jest za krótkie!';
          } else if (values.password.length > 32) {
            errors.password = 'Hasło jest za długie!';
          }
          if (!values.email) {
            errors.email = 'Adres email jest wymagany!';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Wprowadzony adres email jest nieprawidłowy!';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          // TODO!
          console.log('Dodawanie użytkownika');
          ApiQueries.addItem('users', values, setMessage, setErrMessage);
          if (!errMessage) {
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
                placeholder="Nazwa użytkownika"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hasło:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Podaj hasło"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Podaj adres email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </Form.Group>
            <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zatwierdź</Button>
          </Form>          
        )}
      </Formik>

      { message && <Alert variant="success">{message}</Alert> }
      { errMessage && <Alert variant="danger">{errMessage}</Alert> }
    </div>
  )
}

export default Registration;