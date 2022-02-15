import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';

import Config from '../../../config/config';

const SalariesForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.SALARIES, id, setItems, setIsLoaded);
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
    basic: '',
    bonus: '',
    accessories: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'wynagrodzenie') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (values.basic < 0) {
              errors.basic = 'Kwota nie może być niższa od 0!';
            }
            if (values.bonus < 0) {
              errors.bonus = 'Kwota nie może być niższa od 0!';
            }
            if (values.accessories < 0) {
              errors.accessories = 'Kwota nie może być niższa od 0!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.SALARIES, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.SALARIES, id, values, setMessage, setErrMessage);
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
                <EmployeesSelect handleChange={handleChange} values={values} />
                {<p className="validationError">{errors.employeeId && touched.employeeId && errors.employeeId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wynagrodzenie podstawowe:</Form.Label>
                <Form.Control
                  type="number"
                  name="basic"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.basic || 0}
                  min={0}
                />
                {<p className="validationError">{errors.basic && touched.basic && errors.basic}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Premia:</Form.Label>
                <Form.Control
                  type="number"
                  name="bonus"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bonus || 0}
                  min={0}
                />
                {<p className="validationError">{errors.bonus && touched.bonus && errors.bonus}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Wynagrodzenie dodatkowe:</Form.Label>
                <Form.Control
                  type="number"
                  name="accessories"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accessories || 0}
                  min={0}
                />
                {<p className="validationError">{errors.accessories && touched.accessories && errors.accessories}</p>}
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

export default SalariesForm;