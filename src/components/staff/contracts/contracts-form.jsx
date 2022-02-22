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

const ContractsForm = () => {
  const { id } = useParams();
  const [items, setItems] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (id) {
      ApiQueries.getItemDetails(Config.CONTRACTS, id, setItems, setIsLoaded);
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
    contractType: '',
    dateOfConclusion: '',
    expirationDate: '',
  }

  if (isLoaded) {
    if (id) {
      const { data } = items;
      initialValues = { ...data };
    }

    return (
      <div className='form'>
        { formTitle(id, 'umowę') }
        
        <Formik 
          initialValues={initialValues}
          validate={values => {
            const errors = {};
            if (!values.employeeId) {
              errors.employeeId = 'Nie wybrano pracownika!';
            }
            if (!values.contractType) {
              errors.contractType = 'Wybierz z listy typ kontraktu!';
            }
            if (!values.dateOfConclusion) {
              errors.dateOfConclusion = 'Data zawarcia umowy jest wymagana!';
            } else if (!values.dateOfConclusion && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.dateOfConclusion)) {
              errors.dateOfConclusion = 'Podana data jest nieprawidłowa!';
            }
            if (!values.expirationDate) {
              errors.expirationDate = 'Data zakończenia umowy jest wymagana!';
            } else if (!values.expirationDate && !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i.test(values.expirationDate)) {
              errors.expirationDate = 'Podana data jest nieprawidłowa!';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            resetMessages();
  
            if (!id) {
              ApiQueries.addItem(Config.CONTRACTS, values, setMessage, setErrMessage);
            } else {
              ApiQueries.updateItem(Config.CONTRACTS, id, values, setMessage, setErrMessage);
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
                <Form.Label>Typ umowy:</Form.Label>
                <Form.Select 
                  name="contractType"
                  onChange={handleChange}
                  value={values.contractType}
                  defaultChecked={values?.contractType}
                >
                  <option value="">Proszę wybrać opcję</option>
                  <option value="1">Na okres próbny</option>
                  <option value="2">Na czas określony</option>
                  <option value="3">Na czas nieokreślony</option>
                  <option value="4">Na czas wykonywania określonej pracy</option>
                  <option value="5">Na zastępstwo</option>
                </Form.Select>
                {<p className="validationError">{errors.contractType && touched.contractType && errors.contractType}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data zawarcia umowy:</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfConclusion"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfConclusion ? DateConverters.formDateConverter(values.dateOfConclusion) : values.dateOfConclusion}
                />
                {<p className="validationError">{errors.dateOfConclusion && touched.dateOfConclusion && errors.dateOfConclusion}</p>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data zakończenia umowy:</Form.Label>
                <Form.Control
                  type="date"
                  name="expirationDate"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.expirationDate ? DateConverters.formDateConverter(values.expirationDate) : values.expirationDate}
                />
                {<p className="validationError">{errors.expirationDate && touched.expirationDate && errors.expirationDate}</p>}
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

export default ContractsForm;