import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Alert, Button, Form } from 'react-bootstrap';

import SessionQuaries from '../../helpers/session-queries';

import './login.style.scss';

const Login = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const handleRegistration = () => {
    navigate('/registration', { replace: false }, [navigate]);
  }

  return (
    <div className="login-container">
      <div className="login-container__title">
        <h1>System Zarządzania Kontrolą Produkcji</h1>
      </div>
      <div className="login-container__form">
        <h2>Logowanie użytkownika</h2>
        
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
                <Button variant="outline-primary" type="submit" disabled={isSubmitting}>Zaloguj</Button>
                <Button onClick={handleRegistration}>Zarejestruj</Button>
            </Form>
          )}
        </Formik>

        { message && <Alert variant="success">{message}</Alert> }
        { errMessage && <Alert variant="danger">{errMessage}</Alert> }
      </div>
      <div className="login-container__footer">
        <p>System Zarządzania Kontrolą Produkcji© by Jakub Czyż 2022. Wszelkie prawa zastrzeżone.</p>
      </div>
    </div>
  )
}

export default Login;