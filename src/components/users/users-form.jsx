import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import Loading from '../loading/loading';

import formTitle from '../commons/form-title';
import ReturnButton from '../commons/return-button';

import ApiQueries from '../../helpers/api-queries';

import Config from '../../config/config';

const UsersForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.USERS, id, setItems, setIsLoaded);
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
    email: '',
    role: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data };
    }

    return (
      <div className='form'>
        { formTitle(id, 'użytkownika') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.role) {
              errors.role = 'Wybierz rolę pracownika!';
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
  
            if (!id) {
              ApiQueries.addItem(Config.USERS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.USERS, id, values, setMessage, setErrMessage);
            }
  
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
                  value={values.name}
                  disabled={true}
                />
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
              <Form.Group className="mb-3">
                <Form.Label>Rola użytkownika:</Form.Label>
                <Form.Select 
                  name="role"
                  onChange={handleChange}
                  value={values.role}
                  defaultChecked={values?.role}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value="admin">Administrator</option>
                  <option value="user">Użytkownik</option>
                  <option value="office">Pracownik kadr</option>
                  <option value="production">Pracownik produkcji</option>
                  <option value="maintenance">Pracownik utrzymania ruchu</option>
                  <option value="warehouse">Pracownik magazynu</option>
                </Form.Select>
                {<p className="validationError">{errors.role && touched.role && errors.role}</p>}
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

export default UsersForm;