import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'services';

const ServicesForm = () => {
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
    name: '',
    description: '',
    state: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'maszynę') }
        
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
            if (!values.state) {
              errors.state = 'Wybierz stan maszyny!';
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
                <Form.Label>Nazwa:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nazwa maszyny"
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
                  placeholder="Nazwa maszyny"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {<p className="validationError">{errors.description && touched.description && errors.description}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stan maszyny:</Form.Label>
                <Form.Select 
                  name="state"
                  onChange={handleChange}
                  value={values.state}
                  defaultChecked={values?.state}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value="true">Sprawna</option>
                  <option value="false">Awaria</option>
                </Form.Select>
                {<p className="validationError">{errors.state && touched.state && errors.state}</p>}
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

export default ServicesForm;