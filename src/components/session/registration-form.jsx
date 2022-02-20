import { useState } from 'react';
import { Formik } from 'formik';
import { Alert, Form, Button } from 'react-bootstrap';

import ReturnButton from '../commons/return-button';

import ApiQueries from '../../helpers/api-queries';

import Config from '../../config/config';

import './registration-form.style.scss';

const Registration = () => {
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const resetMessages = () => {
    setMessage('');
    setErrMessage('');
  }

  return (
    <div className='registration-container'>
      <div className="registration-container__form">
        <h2>Rejestracja użytkownika</h2>
        
        <Formik 
          initialValues={{
            name: '',
            password: '',
            repeatPassword: '',
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
            if (values.repeatPassword !== values.password) {
              errors.repeatPassword = 'Hasło musi być identyczne!';
            }
            if (!values.email) {
              errors.email = 'Adres email jest wymagany!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Wprowadzony adres email jest nieprawidłowy!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();

            ApiQueries.addItem(Config.USERS, values, setMessage, setErrMessage);

            if (message) {
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
                <p className="validationError">{errors.name && touched.name && errors.name}</p>
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
                <p className="validationError">{errors.password && touched.password && errors.password}</p>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Powtórz hasło:</Form.Label>
                <Form.Control
                  type="password"
                  name="repeatPassword"
                  placeholder="Podaj hasło"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                />
                <p className="validationError">{errors.repeatPassword && touched.repeatPassword && errors.repeatPassword}</p>
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
                <p className="validationError">{errors.email && touched.email && errors.email}</p>
              </Form.Group>
              <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zatwierdź</Button>
              <ReturnButton />
            </Form>          
          )}
        </Formik>

        { message && <Alert variant="success">{message}</Alert> }
        { errMessage && <Alert variant="danger">{errMessage}</Alert> }
      </div>
    </div>
  )
}

export default Registration;