import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

const END_POINT = 'permits';

const PermitsForm = () => {
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
    employeeId: '',
    exitTime: '',
    returnTime: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'przepustkę') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (!values.exitTime) {
              errors.exitTime = 'Podaj godzinę wyjścia!';
            }
            if (!values.returnTime) {
              errors.returnTime = 'Podaj godzinę powrotu!';
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
                <Form.Label>Wybierz pracownika:</Form.Label>
                <EmployeesSelect handleChange={handleChange} values={values} />
                {<p className="validationError">{errors.employeeId && touched.employeeId && errors.employeeId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Godzina wyjścia:</Form.Label>
                <Form.Control
                  type="time"
                  name="exitTime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.exitTime}
                />
                {<p className="validationError">{errors.exitTime && touched.exitTime && errors.exitTime}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Godzina powrotu:</Form.Label>
                <Form.Control
                  type="time"
                  name="returnTime"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.returnTime}
                  min={values.exitTime}
                />
                {<p className="validationError">{errors.returnTime && touched.returnTime && errors.returnTime}</p>}
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

export default PermitsForm;