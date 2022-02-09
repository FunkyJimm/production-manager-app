import { useState } from "react";
import { Formik } from "formik";
import { Alert, Button, Form } from 'react-bootstrap';

import SessionQuaries from '../../helpers/session-queries';

const Login = ({ setIsLogged }) => {
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  return (
    <div className="login-container">
      <h1>Logowanie użytkownika</h1>
      <Formik
        initialValues={{ name: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Podaj nazwę użytkownika!';
          }
          if (!values.password) {
            errors.password = 'Podaj prawidłowe hasło!';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          SessionQuaries.login(values, setMessage, setErrMessage, setIsLogged);
          if (!errMessage) {
            setSubmitting(false);
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
            <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zaloguj</Button>
          </Form>
        )}
      </Formik>

      { message && <Alert variant="success">{message}</Alert> }
      { errMessage && <Alert variant="danger">{errMessage}</Alert> }
    </div>
  )
}

export default Login;