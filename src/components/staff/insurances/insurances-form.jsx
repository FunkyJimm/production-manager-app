import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { Alert, Button, Form } from 'react-bootstrap';

import EmployeesSelect from '../../commons/employees-select';
import Loading from '../../loading/loading';

import formTitle from '../../commons/form-title';
import ReturnButton from '../../commons/return-button';

import ApiQueries from '../../../helpers/api-queries';
import DateConverters from '../../../helpers/date-converters';

import Config from '../../../config/config';

const InsurancesForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.INSURANCES, id, setItems, setIsLoaded);
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
    name: '',
    type: '',
    amount: '',
    dateFrom: '',
    dateTo: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data }; 
    }

    return (
      <div className='form'>
        { formTitle(id, 'ubezpieczenie') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (!values.name) {
              errors.name = 'Nazwa jest wymagana!';
            } else if (values.name.length < 2) {
              errors.name = 'Nazwa jest za krótka!';
            } else if (values.name.length > 64) {
              errors.name = 'Nazwa jest za długa!';
            }
            if (!values.type) {
              errors.type = 'Wybierz z listy typ ubezpieczenia!';
            }
            if (values.amount < 0) {
              errors.amount = 'Kwota nie może być niższa od 0!';
            }
            if (!values.dateFrom) {
              errors.dateFrom = 'Data zawarcia polisy jest wymagana!';
            } else if (!values.dateFrom && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateFrom)) {
              errors.dateFrom = 'Podana data jest nieprawidłowa!';
            }
            if (!values.dateTo) {
              errors.dateTo = 'Data zakończenia polisy jest wymagana!';
            } else if (!values.dateTo && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateTo)) {
              errors.dateTo = 'Podana data jest nieprawidłowa!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.INSURANCES, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.INSURANCES, id, values, setMessage, setErrMessage);
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
                <EmployeesSelect handleChange={handleChange} value={values.employeeId} />
                {<p className="validationError">{errors.employeeId && touched.employeeId && errors.employeeId}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nazwa:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Nazwa firmy ubezpieczeniowej"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {<p className="validationError">{errors.name && touched.name && errors.name}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Typ umowy:</Form.Label>
                <Form.Select 
                  name="type"
                  onChange={handleChange}
                  value={values.contractType}
                  defaultChecked={values?.contractType}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value="1">Rodzinne</option>
                  <option value="2">Zdrowotne</option>
                  <option value="3">Wypadkowe</option>
                  <option value="4">Na dziecko</option>
                  <option value="5">Opieka medyczna</option>
                </Form.Select>
                {<p className="validationError">{errors.contractType && touched.contractType && errors.contractType}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kwota ubezpieczenia:</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount || 0}
                  min={0}
                />
                {<p className="validationError">{errors.amount && touched.amount && errors.amount}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data zawarcia umowy:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFrom"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateFrom ? DateConverters.formDateConverter(values.dateFrom) : values.dateFrom}
                />
                {<p className="validationError">{errors.dateFrom && touched.dateFrom && errors.dateFrom}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data zakończenia umowy:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateTo"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateTo ? DateConverters.formDateConverter(values.dateTo) : values.dateTo}
                />
                {<p className="validationError">{errors.dateTo && touched.dateTo && errors.dateTo}</p>}
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

export default InsurancesForm;